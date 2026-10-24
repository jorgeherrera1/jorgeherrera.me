#!/usr/bin/env node
import { spawn, spawnSync, execFileSync } from 'node:child_process';
import { closeSync, openSync, readFileSync, writeFileSync } from 'node:fs';
import { mkdir, readFile, writeFile, rename, rm, readdir } from 'node:fs/promises';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '../../../..');
const VIEWPORT = { width: 1280, height: 900 };
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function usage() {
  return `Usage (from any cwd, paths resolve against the repo root):
  VERIFY_RUN_ID=<id> node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs launch
  VERIFY_RUN_ID=<id> node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs doctor
  VERIFY_RUN_ID=<id> node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs cleanup
  VERIFY_RUN_ID=<id> node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser open --path /about/
  VERIFY_RUN_ID=<id> node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "START" --wait navigation
  VERIFY_RUN_ID=<id> node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --selector '[data-question-block="true"]' --index 0 --wait inplace
  VERIFY_RUN_ID=<id> node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser has --role heading --name "ABOUT JORGE"
  VERIFY_RUN_ID=<id> node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser attr --role link --name "SEND MESSAGE" --attr href
  VERIFY_RUN_ID=<id> node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser count --selector '[data-question-block="true"]'
  VERIFY_RUN_ID=<id> node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser prop --selector '[data-question-block="true"]' --index 0 --name className
  VERIFY_RUN_ID=<id> node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser url
  VERIFY_RUN_ID=<id> node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser snapshot --aria --path artifacts/verify-jorgeherrera-me/<id>/page.aria.txt
  VERIFY_RUN_ID=<id> node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser screenshot --path artifacts/verify-jorgeherrera-me/<id>/page.png
  VERIFY_RUN_ID=<id> node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs http get --path /rss.xml --out artifacts/verify-jorgeherrera-me/<id>/rss.xml

VERIFY_PORT defaults to 4473. Do not point it at a dev server this run did not start.
CHROME_PATH overrides the Chrome binary. Default is /usr/bin/google-chrome.`;
}

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) {
      positional.push(arg);
      continue;
    }
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) flags[key] = true;
    else {
      flags[key] = next;
      i++;
    }
  }
  return { positional, flags };
}

function runId() {
  const id = process.env.VERIFY_RUN_ID ?? '';
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test(id)) {
    throw new Error('Set VERIFY_RUN_ID to a short id (letters, numbers, dot, underscore, hyphen). This harness will not attach to a shared default session.');
  }
  return id;
}

function appPort() {
  const port = Number(process.env.VERIFY_PORT ?? '4473');
  if (!Number.isInteger(port) || port < 1024 || port > 65535) {
    throw new Error('VERIFY_PORT must be an integer from 1024 to 65535.');
  }
  return port;
}

function sessionDir(id) {
  return path.join('/tmp/verify-jorgeherrera-me', id);
}

function sessionPath(id) {
  return path.join(sessionDir(id), 'session.json');
}

async function readSession(id) {
  const raw = await readFile(sessionPath(id), 'utf8');
  return JSON.parse(raw);
}

async function writeSession(session) {
  const dest = sessionPath(session.runId);
  await mkdir(path.dirname(dest), { recursive: true });
  const tmp = `${dest}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(session, null, 2));
  await rename(tmp, dest);
}

function assertRepo() {
  const pkg = JSON.parse(readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
  if (pkg.name !== 'jorgeherrera.me') throw new Error(`Refusing to drive ${repoRoot}. package.json name is ${pkg.name}.`);
}

function astroVersion() {
  const pkg = JSON.parse(readFileSync(path.join(repoRoot, 'node_modules/astro/package.json'), 'utf8'));
  return pkg.version;
}

function gitSha() {
  return execFileSync('git', ['-C', repoRoot, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
}

function cmdline(pid) {
  try {
    return readFileSync(`/proc/${pid}/cmdline`).toString().replaceAll('\0', ' ');
  } catch {
    return '';
  }
}

function alive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function ppid(pid) {
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, 'utf8');
    const rest = stat.slice(stat.lastIndexOf(')') + 2).split(' ');
    return Number(rest[1]);
  } catch {
    return 0;
  }
}

function isSameOrDescendant(pid, ancestor) {
  let current = pid;
  const seen = new Set();
  while (current > 1 && !seen.has(current)) {
    if (current === ancestor) return true;
    seen.add(current);
    const parent = ppid(current);
    if (!parent || parent === current) break;
    current = parent;
  }
  return false;
}

function listenPids(port) {
  try {
    const out = execFileSync('lsof', ['-nP', `-iTCP:${port}`, '-sTCP:LISTEN', '-t'], { encoding: 'utf8' });
    return out.split('\n').map((line) => line.trim()).filter(Boolean).map(Number);
  } catch (error) {
    if (error && error.status === 1) return [];
    throw error;
  }
}

async function pidsMatching(snippet) {
  const names = await readdir('/proc');
  const hits = [];
  for (const name of names) {
    if (!/^\d+$/.test(name)) continue;
    const pid = Number(name);
    if (cmdline(pid).includes(snippet)) hits.push(pid);
  }
  return hits;
}

function portFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.listen(port, '127.0.0.1', () => server.close(() => resolve(true)));
  });
}

function httpJson(port, method, pathname) {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: '127.0.0.1', port, path: pathname, method }, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if ((res.statusCode ?? 500) >= 300) reject(new Error(`${method} ${pathname} returned ${res.statusCode}: ${body.slice(0, 300)}`));
        else resolve(JSON.parse(body));
      });
    });
    req.setTimeout(5000, () => req.destroy(new Error(`timeout ${method} ${pathname}`)));
    req.on('error', reject);
    req.end();
  });
}

async function markerOk(origin) {
  const response = await fetch(`${origin}/`, { signal: AbortSignal.timeout(20000) });
  const text = await response.text();
  const checks = {
    status: response.status === 200,
    title: text.includes('<title>Jorge Herrera</title>'),
    heading: text.includes('JORGE HERRERA'),
    coin: text.includes('×40'),
  };
  return { ok: Object.values(checks).every(Boolean), checks };
}

async function tail(file, lines) {
  try {
    const text = await readFile(file, 'utf8');
    return text.split('\n').slice(-lines).join('\n');
  } catch {
    return '';
  }
}

function previewSnippet(port) {
  return `--host 127.0.0.1 --port ${port} --ignore-lock`;
}

async function killOwned(pid, snippet, also = '') {
  if (!pid || !alive(pid)) return 'already-dead';
  const cmd = cmdline(pid);
  if (!cmd.includes(snippet) || (also && !cmd.includes(also))) return `left-alive pid ${pid} cmdline did not include the launch snippet`;
  try {
    process.kill(-pid, 'SIGTERM');
  } catch (error) {
    if (error?.code !== 'ESRCH') throw error;
    try {
      process.kill(pid, 'SIGTERM');
    } catch (inner) {
      if (inner?.code !== 'ESRCH') throw inner;
    }
  }
  for (let i = 0; i < 20; i++) {
    if (!alive(pid)) return 'terminated';
    await sleep(100);
  }
  try {
    process.kill(-pid, 'SIGKILL');
  } catch (error) {
    if (error?.code !== 'ESRCH') throw error;
  }
  try {
    process.kill(pid, 'SIGKILL');
  } catch (error) {
    if (error?.code !== 'ESRCH') throw error;
  }
  return 'killed';
}

async function sweep(snippet, also = '') {
  const matches = async () => (await pidsMatching(snippet)).filter((pid) => pid !== process.pid && (!also || cmdline(pid).includes(also)));
  for (const pid of await matches()) {
    try {
      process.kill(pid, 'SIGTERM');
    } catch (error) {
      if (error?.code !== 'ESRCH') throw error;
    }
  }
  await sleep(200);
  for (const pid of await matches()) {
    try {
      process.kill(pid, 'SIGKILL');
    } catch (error) {
      if (error?.code !== 'ESRCH') throw error;
    }
  }
}

async function cleanupSession(session) {
  const chromeResult = await killOwned(session.chromePid, session.userDataDir);
  await sweep(session.userDataDir);
  const previewResult = await killOwned(session.previewPid, previewSnippet(session.appPort), 'preview');
  await sweep(previewSnippet(session.appPort), 'preview');
  await rm(sessionDir(session.runId), { recursive: true, force: true });
  return { chromeResult, previewResult };
}

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.pending = new Map();
    this.listeners = new Map();
    this.nextId = 0;
    ws.addEventListener('message', (event) => {
      const raw = typeof event.data === 'string' ? event.data : Buffer.from(event.data).toString('utf8');
      const message = JSON.parse(raw);
      if (message.id && this.pending.has(message.id)) {
        const waiter = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) waiter.reject(new Error(message.error.message || JSON.stringify(message.error)));
        else waiter.resolve(message.result ?? {});
        return;
      }
      if (message.method) {
        for (const listener of this.listeners.get(message.method) ?? []) listener(message.params ?? {});
      }
    });
  }

  send(method, params = {}, timeoutMs = 20000) {
    const id = ++this.nextId;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`timeout calling ${method}`));
      }, timeoutMs);
      this.pending.set(id, {
        resolve: (value) => { clearTimeout(timer); resolve(value); },
        reject: (error) => { clearTimeout(timer); reject(error); },
      });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, listener) {
    const list = this.listeners.get(method) ?? [];
    list.push(listener);
    this.listeners.set(method, list);
  }

  off(method, listener) {
    const list = (this.listeners.get(method) ?? []).filter((item) => item !== listener);
    this.listeners.set(method, list);
  }
}

function connectWs(url) {
  const ws = new WebSocket(url);
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`websocket timeout ${url}`)), 5000);
    ws.addEventListener('open', () => { clearTimeout(timer); resolve(ws); });
    ws.addEventListener('error', () => { clearTimeout(timer); reject(new Error(`websocket error ${url}`)); });
  });
}

async function withPage(session, fn) {
  const list = await httpJson(session.chromeDebugPort, 'GET', '/json/list');
  const page = list.find((target) => target.id === session.pageTargetId && target.type === 'page');
  if (!page?.webSocketDebuggerUrl) throw new Error(`Chrome page ${session.pageTargetId} is gone. Run cleanup, then launch.`);
  const ws = await connectWs(page.webSocketDebuggerUrl);
  const cdp = new Cdp(ws);
  try {
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('DOM.enable');
    await cdp.send('DOM.getDocument');
    await cdp.send('Accessibility.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: VIEWPORT.width,
      height: VIEWPORT.height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    return await fn(cdp);
  } finally {
    ws.close();
  }
}

async function evaluate(cdp, expression) {
  const result = await cdp.send('Runtime.evaluate', { expression, returnByValue: true });
  if (result.exceptionDetails) throw new Error(`evaluate failed: ${JSON.stringify(result.exceptionDetails.text ?? result.exceptionDetails)}`);
  return result.result?.value;
}

function axValue(field) {
  if (typeof field === 'string') return field;
  if (field && typeof field.value === 'string') return field.value;
  return '';
}

async function axNodes(cdp) {
  const tree = await cdp.send('Accessibility.getFullAXTree');
  return tree.nodes ?? [];
}

function namedNodes(nodes, role, name) {
  return nodes.filter((node) => axValue(node.role) === role && axValue(node.name) === name && node.backendDOMNodeId);
}

async function boxCenter(cdp, backendNodeId) {
  await cdp.send('DOM.scrollIntoViewIfNeeded', { backendNodeId }).catch(() => {});
  const { model } = await cdp.send('DOM.getBoxModel', { backendNodeId });
  const quad = model?.content;
  if (!quad || quad.length < 8) throw new Error(`backend node ${backendNodeId} has no box. The 1280x900 viewport may be hiding it.`);
  const xs = [quad[0], quad[2], quad[4], quad[6]];
  const ys = [quad[1], quad[3], quad[5], quad[7]];
  const width = Math.max(...xs) - Math.min(...xs);
  const height = Math.max(...ys) - Math.min(...ys);
  if (width < 1 || height < 1) throw new Error(`backend node ${backendNodeId} has a ${width}x${height} box.`);
  return { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: (Math.min(...ys) + Math.max(...ys)) / 2 };
}

async function selectorCenter(cdp, selector, index) {
  const expression = `(() => {
    const el = document.querySelectorAll(${JSON.stringify(selector)})[${index}];
    if (!el) return null;
    el.scrollIntoView({ block: 'center', inline: 'center' });
    const rect = el.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2, width: rect.width, height: rect.height };
  })()`;
  const rect = await evaluate(cdp, expression);
  if (!rect) {
    const count = await evaluate(cdp, `document.querySelectorAll(${JSON.stringify(selector)}).length`);
    throw new Error(`selector ${selector} index ${index} missed. Count is ${count}.`);
  }
  if (rect.width < 1 || rect.height < 1) throw new Error(`selector ${selector} index ${index} has a ${rect.width}x${rect.height} box.`);
  return { x: rect.x, y: rect.y };
}

async function clickAt(cdp, x, y, waitMode) {
  const startUrl = await evaluate(cdp, 'location.href');
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none' });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
  if (waitMode === 'inplace') {
    console.log(`clicked ${Math.round(x)},${Math.round(y)} wait=inplace url=${startUrl}`);
    return;
  }
  if (waitMode !== 'navigation') throw new Error('--wait must be navigation or inplace');
  const deadline = Date.now() + 30000;
  let href = startUrl;
  let ready = '';
  while (Date.now() < deadline) {
    href = await evaluate(cdp, 'location.href');
    ready = await evaluate(cdp, 'document.readyState');
    if (href !== startUrl && ready === 'complete') {
      console.log(`clicked ${Math.round(x)},${Math.round(y)} wait=navigation url=${href}`);
      return;
    }
    await sleep(100);
  }
  throw new Error(`navigation did not finish. start=${startUrl} last=${href} ready=${ready}`);
}

function requireFlag(flags, key) {
  const value = flags[key];
  if (typeof value !== 'string' || value.length === 0) throw new Error(`Missing --${key}`);
  return value;
}

function indexFlag(flags) {
  if (flags.index === undefined) return 0;
  const index = Number(flags.index);
  if (!Number.isInteger(index) || index < 0) throw new Error('--index must be a non-negative integer');
  return index;
}

function resolveOut(file) {
  return path.isAbsolute(file) ? file : path.join(repoRoot, file);
}

async function navigatePath(cdp, origin, urlPath) {
  if (!urlPath.startsWith('/') || urlPath.startsWith('//')) throw new Error('--path must be a same-origin path starting with /');
  const target = new URL(urlPath, origin);
  await cdp.send('Page.navigate', { url: target.href });
  const deadline = Date.now() + 30000;
  let href = '';
  let ready = '';
  while (Date.now() < deadline) {
    href = await evaluate(cdp, 'location.href');
    ready = await evaluate(cdp, 'document.readyState');
    let current;
    try { current = new URL(href); } catch { current = null; }
    if (current && current.origin === target.origin && current.pathname === target.pathname && ready === 'complete') {
      console.log(href);
      return;
    }
    await sleep(100);
  }
  throw new Error(`timed out opening ${target.href}. last=${href} ready=${ready}`);
}

function formatDoctor(report) {
  return [
    report.ok ? 'ok' : 'not-ok',
    `origin ${report.origin}`,
    `previewPid ${report.previewPid} ${report.previewAlive ? 'alive' : 'dead'}`,
    `chromePid ${report.chromePid} ${report.chromeAlive ? 'alive' : 'dead'}`,
    `portOwners ${report.portOwners.join(',') || 'none'}`,
    `astro ${report.astro}`,
    `gitSha ${report.gitSha}`,
    `gitShaAtLaunch ${report.gitShaAtLaunch}`,
    `marker ${report.marker ? 'JORGE HERRERA' : 'missing'}`,
    'auth none',
    `chrome ${report.chrome}`,
  ].join('\n');
}

async function doctorReport(session) {
  const owners = listenPids(session.appPort);
  const owned = owners.length > 0 && owners.every((pid) => isSameOrDescendant(pid, session.previewPid));
  const chromeHits = await pidsMatching(session.userDataDir);
  let chrome = 'unreachable';
  let versionOk = false;
  try {
    const version = await httpJson(session.chromeDebugPort, 'GET', '/json/version');
    chrome = version.Browser ?? 'unknown';
    versionOk = chrome === session.chromeBrowser;
  } catch {
    versionOk = false;
  }
  let marker = false;
  try {
    marker = (await markerOk(session.origin)).ok;
  } catch {
    marker = false;
  }
  const astro = astroVersion();
  const report = {
    ok: alive(session.previewPid)
      && cmdline(session.previewPid).includes(previewSnippet(session.appPort))
      && cmdline(session.previewPid).includes('preview')
      && owned
      && chromeHits.length > 0
      && versionOk
      &&     marker
      && astro === session.astroVersion
      && gitSha() === session.gitSha,
    origin: session.origin,
    previewPid: session.previewPid,
    previewAlive: alive(session.previewPid),
    chromePid: session.chromePid,
    chromeAlive: chromeHits.length > 0,
    portOwners: owners,
    astro,
    gitSha: gitSha(),
    gitShaAtLaunch: session.gitSha,
    marker,
    chrome,
  };
  return report;
}

async function launch() {
  assertRepo();
  const id = runId();
  const port = appPort();
  try {
    const existing = await readSession(id);
    const report = await doctorReport(existing);
    if (report.ok && existing.appPort === port) {
      console.log(formatDoctor(report));
      console.log('launch reused the healthy session');
      return;
    }
    await cleanupSession(existing);
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      try {
        const existing = await readSession(id);
        await cleanupSession(existing);
      } catch (cleanupError) {
        if (cleanupError?.code !== 'ENOENT') throw cleanupError;
      }
    }
  }

  if (!(await portFree(port))) {
    throw new Error(`127.0.0.1:${port} is already in use. Set VERIFY_PORT to a free port. This harness will not attach to a server it did not start.`);
  }
  try {
    astroVersion();
  } catch {
    throw new Error('node_modules/astro is missing. From the repo root run npm ci, then launch again.');
  }

  const dir = sessionDir(id);
  await mkdir(dir, { recursive: true });
  const buildLog = path.join(dir, 'build.log');
  const previewLog = path.join(dir, 'preview.log');
  const chromeLog = path.join(dir, 'chrome.log');
  const userDataDir = path.join(dir, 'chrome-profile');
  const built = spawnSync('npm', ['run', 'build'], {
    cwd: repoRoot,
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
    encoding: 'utf8',
    timeout: 120000,
  });
  writeFileSync(buildLog, `${built.stdout ?? ''}\n${built.stderr ?? ''}`);
  if (built.error || built.status !== 0) {
    const tailText = `${built.stdout ?? ''}\n${built.stderr ?? ''}`.split('\n').slice(-40).join('\n');
    throw new Error(`npm run build exited ${built.status ?? 'no status'}.\n${tailText}`);
  }
  const origin = `http://127.0.0.1:${port}`;
  const session = {
    runId: id,
    appPort: port,
    origin,
    previewPid: 0,
    chromePid: 0,
    chromeDebugPort: 0,
    chromeBrowser: '',
    pageTargetId: '',
    userDataDir,
    previewLog,
    chromeLog,
    astroVersion: astroVersion(),
    gitSha: gitSha(),
    viewport: VIEWPORT,
  };

  const previewFd = openSync(previewLog, 'a');
  const preview = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port), '--ignore-lock'], {
    cwd: repoRoot,
    detached: true,
    stdio: ['ignore', previewFd, previewFd],
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', BROWSER: 'none' },
  });
  preview.unref();
  closeSync(previewFd);
  session.previewPid = preview.pid ?? 0;
  await writeSession(session);

  const readyDeadline = Date.now() + 90000;
  let ready = false;
  let readyError = 'server did not become ready';
  while (Date.now() < readyDeadline) {
    if (!alive(session.previewPid)) {
      readyError = 'preview server exited before it was ready';
      break;
    }
    try {
      const checked = await markerOk(origin);
      if (checked.ok) { ready = true; break; }
      readyError = `homepage checks ${JSON.stringify(checked.checks)}`;
    } catch (error) {
      readyError = error instanceof Error ? error.message : String(error);
    }
    await sleep(250);
  }
  if (!ready) {
    const log = await tail(previewLog, 40);
    await cleanupSession(session);
    throw new Error(`${readyError}\n--- preview log ---\n${log}`);
  }

  const chromeBin = process.env.CHROME_PATH || '/usr/bin/google-chrome';
  const chromeFd = openSync(chromeLog, 'a');
  const chrome = spawn(chromeBin, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-dev-shm-usage',
    '--disable-background-networking',
    '--remote-debugging-port=0',
    '--remote-allow-origins=*',
    `--user-data-dir=${userDataDir}`,
    `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
    'about:blank',
  ], {
    detached: true,
    stdio: ['ignore', chromeFd, chromeFd],
  });
  chrome.unref();
  closeSync(chromeFd);
  session.chromePid = chrome.pid ?? 0;
  await writeSession(session);

  const portFile = path.join(userDataDir, 'DevToolsActivePort');
  let debugPort = 0;
  let debugError = null;
  for (let i = 0; i < 50 && !debugPort && !debugError; i++) {
    try {
      const text = await readFile(portFile, 'utf8');
      debugPort = Number(text.split('\n')[0]);
    } catch (error) {
      if (error?.code !== 'ENOENT') debugError = error;
    }
    if (!debugPort && !debugError) await sleep(100);
  }
  if (!debugPort) {
    const log = await tail(chromeLog, 40);
    await cleanupSession(session);
    const reason = debugError ? debugError.message : 'Chrome did not open a DevTools port.';
    throw new Error(`${reason}\n--- chrome log ---\n${log}`);
  }
  session.chromeDebugPort = debugPort;
  const version = await httpJson(debugPort, 'GET', '/json/version');
  session.chromeBrowser = version.Browser ?? '';
  const page = await httpJson(debugPort, 'PUT', '/json/new?about:blank');
  session.pageTargetId = page.id;
  await writeSession(session);
  await withPage(session, async () => {});
  const report = await doctorReport(session);
  console.log(formatDoctor(report));
  if (!report.ok) throw new Error('launch finished but doctor is not ok');
}

async function doctor() {
  assertRepo();
  const session = await readSession(runId());
  const report = await doctorReport(session);
  console.log(formatDoctor(report));
  if (!report.ok) throw new Error('doctor failed');
}

async function cleanup() {
  const id = runId();
  let session;
  try {
    session = await readSession(id);
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      console.log('already-clean');
      return;
    }
    throw error;
  }
  const result = await cleanupSession(session);
  console.log(`cleaned chrome=${result.chromeResult} preview=${result.previewResult}`);
}

async function browser(flags, action) {
  assertRepo();
  const session = await readSession(runId());
  if (action === 'open') {
    const urlPath = requireFlag(flags, 'path');
    await withPage(session, (cdp) => navigatePath(cdp, session.origin, urlPath));
    return;
  }
  if (action === 'url') {
    await withPage(session, async (cdp) => {
      console.log(await evaluate(cdp, 'location.href'));
    });
    return;
  }
  if (action === 'count') {
    const selector = requireFlag(flags, 'selector');
    await withPage(session, async (cdp) => {
      console.log(await evaluate(cdp, `document.querySelectorAll(${JSON.stringify(selector)}).length`));
    });
    return;
  }
  if (action === 'prop') {
    const selector = requireFlag(flags, 'selector');
    const name = requireFlag(flags, 'name');
    if (!['className', 'textContent', 'id'].includes(name)) throw new Error('--name must be className, textContent, or id');
    const index = indexFlag(flags);
    await withPage(session, async (cdp) => {
      const exists = await evaluate(cdp, `document.querySelectorAll(${JSON.stringify(selector)}).length > ${index}`);
      if (!exists) throw new Error(`missing ${selector} index ${index}`);
      const value = await evaluate(cdp, `String(document.querySelectorAll(${JSON.stringify(selector)})[${index}][${JSON.stringify(name)}] ?? '')`);
      console.log(value);
    });
    return;
  }
  if (action === 'has') {
    const role = requireFlag(flags, 'role');
    const name = requireFlag(flags, 'name');
    await withPage(session, async (cdp) => {
      const matches = namedNodes(await axNodes(cdp), role, name);
      if (matches.length === 0) throw new Error(`missing ${role} "${name}"`);
      console.log(`found ${matches.length} ${role} "${name}"`);
    });
    return;
  }
  if (action === 'attr') {
    const role = requireFlag(flags, 'role');
    const name = requireFlag(flags, 'name');
    const attr = requireFlag(flags, 'attr');
    if (!/^[A-Za-z_:][A-Za-z0-9_.:-]*$/.test(attr)) throw new Error('--attr must be an attribute name');
    await withPage(session, async (cdp) => {
      const matches = namedNodes(await axNodes(cdp), role, name);
      if (matches.length !== 1) throw new Error(`expected 1 ${role} "${name}", found ${matches.length}`);
      const resolved = await cdp.send('DOM.resolveNode', { backendNodeId: matches[0].backendDOMNodeId });
      const read = await cdp.send('Runtime.callFunctionOn', {
        objectId: resolved.object.objectId,
        functionDeclaration: 'function (name) { return this.getAttribute(name); }',
        arguments: [{ value: attr }],
        returnByValue: true,
      });
      if (read.result?.value == null) throw new Error(`${role} "${name}" has no ${attr}`);
      console.log(read.result.value);
    });
    return;
  }
  if (action === 'click') {
    const waitMode = requireFlag(flags, 'wait');
    await withPage(session, async (cdp) => {
      if (typeof flags.selector === 'string') {
        const center = await selectorCenter(cdp, flags.selector, indexFlag(flags));
        await clickAt(cdp, center.x, center.y, waitMode);
        return;
      }
      const role = requireFlag(flags, 'role');
      const name = requireFlag(flags, 'name');
      const matches = namedNodes(await axNodes(cdp), role, name);
      const index = indexFlag(flags);
      if (!matches[index]) throw new Error(`expected ${role} "${name}" index ${index}, found ${matches.length}`);
      if (flags.index === undefined && matches.length !== 1) throw new Error(`expected 1 ${role} "${name}", found ${matches.length}. Pass --index to choose.`);
      const center = await boxCenter(cdp, matches[index].backendDOMNodeId);
      await clickAt(cdp, center.x, center.y, waitMode);
    });
    return;
  }
  if (action === 'snapshot') {
    if (flags.aria !== true) throw new Error('snapshot requires --aria');
    const file = resolveOut(requireFlag(flags, 'path'));
    await withPage(session, async (cdp) => {
      const lines = [];
      for (const node of await axNodes(cdp)) {
        const role = axValue(node.role);
        const name = axValue(node.name).replace(/\s+/g, ' ').trim();
        if (!role || !name) continue;
        if (['none', 'InlineTextBox', 'generic', 'StaticText', 'LineBreak'].includes(role)) continue;
        lines.push(`${role} "${name.replaceAll('"', '\\"')}"`);
      }
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, `${lines.join('\n')}\n`);
      console.log(file);
    });
    return;
  }
  if (action === 'screenshot') {
    const file = resolveOut(requireFlag(flags, 'path'));
    await withPage(session, async (cdp) => {
      const shot = await cdp.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, Buffer.from(shot.data, 'base64'));
      console.log(file);
    });
    return;
  }
  throw new Error(`Unknown browser action ${action}`);
}

async function httpGet(flags) {
  assertRepo();
  const session = await readSession(runId());
  const urlPath = requireFlag(flags, 'path');
  if (!urlPath.startsWith('/') || urlPath.startsWith('//')) throw new Error('--path must start with /');
  const response = await fetch(`${session.origin}${urlPath}`, { signal: AbortSignal.timeout(20000) });
  const body = await response.text();
  const type = response.headers.get('content-type') ?? '';
  console.log(`status ${response.status}`);
  console.log(`content-type ${type}`);
  if (response.status !== 200) throw new Error(`GET ${urlPath} returned ${response.status}`);
  if (typeof flags.out === 'string') {
    const file = resolveOut(flags.out);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, body);
    console.log(file);
    return;
  }
  console.log('---');
  console.log(body);
}

async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const [command, action] = positional;
  if (!command || flags.help) {
    console.log(usage());
    return;
  }
  if (command === 'launch') return launch();
  if (command === 'doctor') return doctor();
  if (command === 'cleanup') return cleanup();
  if (command === 'browser') return browser(flags, action);
  if (command === 'http' && action === 'get') return httpGet(flags);
  throw new Error(usage());
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});

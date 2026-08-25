// 🏰 GitHub OAuth callback for the Level Editor (Sveltia CMS at /admin/).
// Exchanges the authorization code for an access token and completes the
// popup postMessage handshake that Sveltia/Decap CMS expects:
//   popup -> opener: "authorizing:github"
//   opener -> popup: "authorizing:github"
//   popup -> opener: "authorization:github:success:{json}" (or :error:{json})
// Both sides only talk to `origin`, so the token can never be handed to a
// window on another site.

// Pinned rather than derived from request.url (see api/auth.ts): the CMS
// popup handshake must target the real site origin, not the deployment host.
const SITE_ORIGIN = 'https://jorgeherrera.me';

interface TokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

// The CMS may be open on the apex or www host; the token reply goes to
// whichever of these the echo actually came from, and nowhere else.
const ALLOWED_OPENER_ORIGINS = [SITE_ORIGIN, 'https://www.jorgeherrera.me'];

function handshakePage(message: string): Response {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Authorizing…</title>
  </head>
  <body>
    <p id="status">Authorizing… this window closes by itself.</p>
    <pre id="log" style="color: #666; font-size: 12px;"></pre>
    <script>
      (() => {
        const allowedOrigins = ${JSON.stringify(ALLOWED_OPENER_ORIGINS)};
        const message = ${JSON.stringify(message)};
        const status = document.getElementById('status');
        const logEl = document.getElementById('log');
        const log = (line) => { logEl.textContent += line + '\\n'; };
        const restart = 'Close this popup AND every Level Editor tab, then start fresh from ' +
          ${JSON.stringify(SITE_ORIGIN)} + '/admin/ in a single tab.';

        // Sveltia opens this popup with the fixed window name "auth", so a
        // leftover popup from an earlier attempt gets REUSED by later ones —
        // with window.opener still pointing at the old, possibly closed,
        // editor tab. Detect that instead of hanging.
        if (!window.opener) {
          status.textContent = 'Could not reach the editor window. ' + restart;
          return;
        }
        if (window.opener.closed) {
          status.textContent = 'The editor window that started this sign-in is gone. ' + restart;
          return;
        }

        // Handshake: ping the opener until the CMS echoes the ping back, then
        // deliver the result to the echo's origin (allowlisted). The ping
        // carries no secret, so '*' is fine and lets the opener be on www.
        let delivered = false;
        window.addEventListener('message', (event) => {
          if (event.data !== 'authorizing:github') return;
          if (!allowedOrigins.includes(event.origin)) {
            log('ignored echo from unexpected origin: ' + event.origin);
            return;
          }
          if (delivered) return;
          delivered = true;
          window.opener.postMessage(message, event.origin);
          status.textContent = 'Done — the editor took it from here.';
          log('result delivered to ' + event.origin);
        });

        let attempts = 0;
        const ping = setInterval(() => {
          if (delivered || attempts >= 20) {
            clearInterval(ping);
            if (!delivered) {
              status.textContent = 'The editor did not respond. ' + restart;
              log('gave up after ' + attempts + ' pings; opener.closed=' + window.opener.closed);
            }
            return;
          }
          attempts += 1;
          window.opener.postMessage('authorizing:github', '*');
          if (attempts === 1) log('pinging the editor window…');
        }, 500);
      })();
    </script>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Set-Cookie': 'oauth_state=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
    },
  });
}

export async function GET(request: Request): Promise<Response> {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const { searchParams } = new URL(request.url);

  const fail = (error: string): Response =>
    handshakePage(`authorization:github:error:${JSON.stringify({ error })}`);

  if (!clientId || !clientSecret) {
    return fail('OAuth environment variables are not configured');
  }

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const cookieState = /(?:^|;\s*)oauth_state=([^;]+)/.exec(
    request.headers.get('cookie') ?? '',
  )?.[1];

  if (!code || !state || state !== cookieState) {
    return fail('Invalid OAuth state — start over from /admin/');
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const data = (await response.json()) as TokenResponse;

  if (!response.ok || !data.access_token) {
    return fail(data.error_description ?? data.error ?? 'Token exchange failed');
  }

  return handshakePage(
    `authorization:github:success:${JSON.stringify({ provider: 'github', token: data.access_token })}`,
  );
}

---
name: verify-jorgeherrera-me
description: "Drive the jorgeherrera.me Astro blog in a headless browser and over HTTP. Use to prove the title screen, a level (post), warp bays (tags), about-page question blocks, the Level Editor splash, or the RSS feed against a local production preview."
---

# Verify jorgeherrera.me

The reader-facing surface is the static website. The same preview also serves `/rss.xml` and the Level Editor document at `/admin/`. There is no database and no login on the public pages. Posts are the markdown files in `src/content/blog/`, baked into `dist/` at build time.

Do not run `npm run sync-blog` from a verification session. That script writes posts in this repo and in the Obsidian vault named by `OBSIDIAN_BLOG_PATH`. Do not call `api/auth` or `api/callback`. The preview server does not host those Vercel functions.

## Launch

From the repo root, with dependencies installed (`npm ci` when `node_modules/astro` is missing):

```bash
export VERIFY_RUN_ID="<short-id>"
node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs launch
```

`VERIFY_RUN_ID` is required. The harness refuses a shared default session. Use a different `VERIFY_RUN_ID` and `VERIFY_PORT` for a second run. Two launches in one checkout both write `dist/`. Do not overlap them.

Launch runs `npm run build`, then `npm run preview` bound to `127.0.0.1`. The port is `VERIFY_PORT`, or `4473` when that variable is unset. It passes `--ignore-lock` so this preview does not take the dev-server lock. It then starts headless Chrome with its own user-data dir. The viewport is 1280 by 900, so the desktop HUD links are on screen.

Ready means a real page, not an open socket. Launch polls `http://127.0.0.1:<port>/` until the HTML contains `<title>Jorge Herrera</title>`, `JORGE HERRERA`, and `×40`. The preview log at `/tmp/verify-jorgeherrera-me/$VERIFY_RUN_ID/preview.log` then contains a line `Local    http://127.0.0.1:<port>/`. Launch prints the doctor block and exits 0 only when that block starts with `ok`.

A second launch with the same id reuses the session when doctor is already `ok`. It does not rebuild. After a commit, or after any edit under `src/` or `public/`, run cleanup and launch again. The preview server will not pick up edits by itself.

`astro dev` is the wrong server for this skill. It injects a dev toolbar (Menu, Inspect, Audit, Settings) and answers `/admin/` with 404. `/admin/index.html` is 200 there, which is not the link the title screen uses.

There is no empty data directory to migrate. An empty `src/content/blog/` would build an empty list, which is not this site. Verification uses the committed posts.

## Doctor

```bash
node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs doctor
```

Doctor is read-only. It exits 0 only when all of these are true.

- The recorded preview pid is alive and its command line contains `run preview -- --host 127.0.0.1 --port <port> --ignore-lock`.
- `lsof` shows that port's listeners are that pid or a descendant.
- A Chrome process whose command line contains this run's user-data dir is alive, and `/json/version` reports the same `Browser` string stored at launch.
- `GET /` still contains the three markers above.
- `node_modules/astro` is still the version stored at launch.
- `git rev-parse HEAD` is still the SHA stored at launch.

Auth is `none`. A `gitSha` line that differs from `gitShaAtLaunch` fails doctor even if the process is up, because the preview is a build of the old checkout. Doctor does not see uncommitted edits. Cleanup and launch after changing site source.

Run doctor before the first drive, and again after a drive that did something unexpected.

## Drive

The feature map is `features/README.md`. Read it, then follow one feature file. Run every command from the repo root with `VERIFY_RUN_ID` exported. The shell must expand `$VERIFY_RUN_ID` in artifact paths.

The browser speaks Chrome DevTools Protocol. Clicks go through the accessibility tree when the command passes `--role` and `--name`. The question blocks have no role and no accessible name. Those commands use `[data-question-block="true"]` or `[data-question-block="false"]`.

`--wait navigation` returns after the path changes and `document.readyState` is `complete`. `--wait inplace` returns immediately so a one-second class change is still observable. Every path passed to `browser open` or `http get` starts with a single `/` and stays on the preview origin.

The RSS feed is a second surface. `features/feed.md` drives it with `http get`. No browser is required for that file.

Do not type into the Level Editor, do not complete GitHub OAuth, and do not grant the File System Access API. Arrival is the splash document. Publishing is out of scope.

## Evidence

Proof artifacts go under `artifacts/verify-jorgeherrera-me/$VERIFY_RUN_ID/<feature>/`. That directory is gitignored. Cleanup does not delete it.

For a UI proof, capture the action and the state it caused.

- `browser screenshot` writes the 1280×900 viewport PNG.
- `browser snapshot --aria` writes one `role "name"` line per named accessible node, skipping `generic`, `StaticText`, `none`, `InlineTextBox`, and `LineBreak`.
- `browser prop` prints `className` for the question-block state change.
- `browser url` and `browser attr` print the resulting location or attribute.
- `http get --out` writes the response body for feed and Level Editor HTML.

Exercise the reader path. Do not set classes from a script, do not edit markdown to force a fixture, and do not call a test-only route. This site has none. The Level Editor's "local repository" mode is not a dry run. It writes files. Do not open it.

A screenshot of the final screen is not enough. The question-block proof needs the `className` while `animate-ping` is present and again after it is gone.

## Cleanup

```bash
node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs cleanup
```

Cleanup signals the preview pid and the Chrome pid recorded for this `VERIFY_RUN_ID`, and only if their command lines still contain the launch snippet or the run's user-data dir. It then removes `/tmp/verify-jorgeherrera-me/$VERIFY_RUN_ID/`. A second cleanup prints `already-clean` and exits 0. It does not delete `artifacts/verify-jorgeherrera-me/`.

After a failed launch, run cleanup before retrying so a half-started preview is not left on the port.

## Helpers

The only helper is the executable harness:

```bash
node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs
```

With no command it prints usage. Exit 0 is success. Exit 1 is a failed check, a missing node, or a bad argument. Chrome defaults to `/usr/bin/google-chrome`. Set `CHROME_PATH` to override it.

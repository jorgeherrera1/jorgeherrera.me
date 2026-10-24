# Level editor

The Level Editor is the page at `/admin/`. From the site, a reader arrives by choosing the pipe on the title screen. The document shows the splash `WORLD 1-1 · LEVEL EDITOR`. Signing in and saving a post are outside this map.

## Sub-features

- `editor-pipe` navigates from the title-screen pipe to `/admin/`.
- `editor-splash` serves the splash document with HTTP 200.

## How to get to it (user POV)

- Choose the pipe labeled LEVEL EDITOR on the title screen. Its accessible name is `Warp to the Level Editor`.
- Open `/admin/` directly.

## Driving it with verify-jorgeherrera-me

Preconditions:

- Doctor prints `ok` for this `VERIFY_RUN_ID`.
- The server is the preview started by `launch`. An `astro dev` server is an unmet precondition. On that server `/admin/` is a 404 even though `/admin/index.html` is 200.

- **Pipe entry.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser open --path /` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "Warp to the Level Editor" --wait navigation`. The printed URL pathname is `/admin/`.
- **Splash document.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs http get --path /admin/ --out artifacts/verify-jorgeherrera-me/$VERIFY_RUN_ID/level-editor/admin.html`. The command prints `status 200`. The saved HTML contains `WORLD 1-1 · LEVEL EDITOR` and `NOW LOADING…`.
- **Direct entry.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser open --path /admin/`. The printed URL pathname is `/admin/`.
- **Proof.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser screenshot --path artifacts/verify-jorgeherrera-me/$VERIFY_RUN_ID/level-editor/admin.png` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser snapshot --aria --path artifacts/verify-jorgeherrera-me/$VERIFY_RUN_ID/level-editor/admin.aria.txt`. Keep the HTML body next to them. Arrival is proved by the pathname plus the splash string in that body.

## Gotchas

- Do not sign in, do not type a post, and do not choose a local folder. Saving from the editor commits to GitHub or writes the working tree. This journey stops at the splash.
- The splash page loads `https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js`. When that script mounts a CMS UI, the splash is hidden and the accessibility tree no longer shows `LEVEL EDITOR`. The saved HTML is still the arrival proof. If `browser open` waits until timeout because the script host is blocked, report that timeout and still judge the HTTP body. Do not retarget the pipe at `/admin/index.html` to avoid a hang.
- GitHub OAuth is configured for `https://www.jorgeherrera.me`, and the preview does not serve `api/auth`. A local sign-in cannot succeed.
- Headless Chrome cannot complete the File System Access API prompt the CMS uses for local edits.

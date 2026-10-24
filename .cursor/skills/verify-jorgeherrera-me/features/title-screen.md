# Title screen

The title screen is the homepage. A reader starts the about page, opens the level list, opens the warp bays, opens one of the three latest levels, or drops into the Level Editor pipe.

## Sub-features

- `title-controls` exposes START, VIEW BLOG, EXPLORE WORLDS, and VIEW ALL.
- `title-latest` shows three level cards under LATEST ARTICLES.
- `title-hud` exposes JORGE H, BLOG, TAGS, and ABOUT in the desktop HUD.
- `title-pipe` exposes the Level Editor pipe.

## How to get to it (user POV)

- Open `/`.
- Choose `JORGE H` in the HUD from any other page.

## Driving it with verify-jorgeherrera-me

Preconditions:

- Doctor prints `ok` for this `VERIFY_RUN_ID`.
- The viewport is 1280×900.

- **Open the title screen.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser open --path /`. The printed URL is `http://127.0.0.1:4473/` when `VERIFY_PORT` is `4473`.
- **See the title.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser has --role heading --name "JORGE HERRERA"`. The command prints `found 1 heading "JORGE HERRERA"`.
- **See the latest band.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser has --role heading --name "LATEST ARTICLES"`. The command prints `found 1 heading "LATEST ARTICLES"`.
- **START goes to about.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser attr --role link --name "START" --attr href`. The printed href is `/about/`.
- **VIEW BLOG goes to the level list.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser attr --role link --name "VIEW BLOG" --attr href`. The printed href is `/blog/`.
- **EXPLORE WORLDS goes to the warp bays.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser attr --role link --name "EXPLORE WORLDS" --attr href`. The printed href is `/tags/`.
- **VIEW ALL goes to the level list.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser attr --role link --name "VIEW ALL" --attr href`. The printed href is `/blog/`.
- **HUD home control.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser attr --role link --name "JORGE H" --attr href`. The printed href is `/`.
- **HUD level list.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser attr --role link --name "BLOG" --attr href`. The printed href is `/blog/`.
- **HUD warp bays.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser attr --role link --name "TAGS" --attr href`. The printed href is `/tags/`.
- **HUD about.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser attr --role link --name "ABOUT" --attr href`. The printed href is `/about/`.
- **Latest cards.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser has --role link --name "Open article Reflections on Anthropic and Cursor UI/UX choices"`, then the same command with `"Open article Definitely disappointed with Claude Projects"`, then with `"Open article Disappointed with Claude Projects"`. Each command prints `found 1`.
- **Pipe.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser attr --role link --name "Warp to the Level Editor" --attr href`. The printed href is `/admin/`.
- **Proof.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser snapshot --aria --path artifacts/verify-jorgeherrera-me/$VERIFY_RUN_ID/title-screen/home.aria.txt` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser screenshot --path artifacts/verify-jorgeherrera-me/$VERIFY_RUN_ID/title-screen/home.png`. The snapshot contains `heading "JORGE HERRERA"`, `link "START"`, and `link "Warp to the Level Editor"`.

## Gotchas

- The HUD links are `hidden` below the `md` breakpoint. A viewport narrower than 768px does not contain `BLOG`, `TAGS`, or `ABOUT`. This harness fixes 1280×900. Do not report the mobile HUD as verified.
- The coin label `×40` and the world label `1-1` are static. The date digits beside `JORGE H` are computed when the site is built, in the server's timezone. Do not assert today's date.
- A newer post changes which three cards appear under LATEST ARTICLES. If one of the three `Open article` names is missing, the journey fails. Update this file only after confirming the new post is the newest in `src/content/blog/`.
- `START` on a level card is named `Open article <title>`, not `START`. Only the title-screen control has the accessible name `START`.
- Follow the pipe in [Level editor](./level-editor.md). An href of `/admin/` is not proof that the editor opened.

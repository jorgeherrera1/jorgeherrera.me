# Question blocks

Question blocks on the about page are the only click behavior on the public site. A click on a live block adds `animate-ping` for about one second. A block that is not live ignores the click. The page also links back to the blog and offers a mailto control that must not be activated.

## Sub-features

- `about-start` opens the page from the title-screen START control.
- `about-hud` opens the page from the desktop HUD ABOUT control.
- `block-ping` adds `animate-ping` on the first live block, then removes it.
- `block-inert` leaves a non-live block without `animate-ping`.
- `about-read-blog` follows READ BLOG to the level list.
- `about-mailto` exposes SEND MESSAGE as `mailto:jorge@example.com` and is not clicked.

## How to get to it (user POV)

- Choose `START` on the title screen.
- Choose `ABOUT` in the desktop HUD.
- Open `/about/` directly.

## Driving it with verify-jorgeherrera-me

Preconditions:

- Doctor prints `ok` for this `VERIFY_RUN_ID`.
- The viewport is 1280×900 so the middle title-screen block and the HUD are both present.

- **START entry.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser open --path /` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "START" --wait navigation`. The printed URL pathname is `/about/`.
- **See the title.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser has --role heading --name "ABOUT JORGE"`. The command prints `found 1 heading "ABOUT JORGE"`.
- **Count the blocks.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser count --selector '[data-question-block="true"]'` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser count --selector '[data-question-block="false"]'`. The printed counts are `7` and `2`.
- **Live block starts idle.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser prop --selector '[data-question-block="true"]' --index 0 --name className`. The printed class contains `animate-bounce` and does not contain `animate-ping`.
- **Hit the live block.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --selector '[data-question-block="true"]' --index 0 --wait inplace`. The command prints `wait=inplace`.
- **See the ping.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser prop --selector '[data-question-block="true"]' --index 0 --name className`. The printed class contains `animate-ping`.
- **Capture that state.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser screenshot --path artifacts/verify-jorgeherrera-me/$VERIFY_RUN_ID/question-blocks/during-ping.png` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser snapshot --aria --path artifacts/verify-jorgeherrera-me/$VERIFY_RUN_ID/question-blocks/during-ping.aria.txt`. The snapshot contains `heading "ABOUT JORGE"`. The screenshot shows the title and the question blocks.
- **Wait out the ping.** Run `sleep 1.2`, then `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser prop --selector '[data-question-block="true"]' --index 0 --name className`. The printed class does not contain `animate-ping`.
- **Inert block.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser prop --selector '[data-question-block="false"]' --index 0 --name className`. The printed class does not contain `animate-ping`. Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --selector '[data-question-block="false"]' --index 0 --wait inplace`, then the same `browser prop` command again. The class still does not contain `animate-ping`.
- **READ BLOG.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser open --path /about/` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "READ BLOG" --wait navigation`. The printed URL pathname is `/blog/`.
- **Mailto stays a link.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser open --path /about/` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser attr --role link --name "SEND MESSAGE" --attr href`. The printed href is `mailto:jorge@example.com`. Do not click it. Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser attr --role link --name "VIEW PORTFOLIO" --attr href`. The printed href is `/blog/`.
- **HUD entry.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser open --path /` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "ABOUT" --wait navigation`. The printed URL pathname is `/about/` and `heading "ABOUT JORGE"` is present.

## Gotchas

- The blocks are `div` elements. There is no button role and the visible `?` is not an accessible name. A role click will not find them.
- `animate-ping` is removed about 1000ms after the click. `--wait inplace` is required. A navigation wait, or a pause before the first `className` read, misses the proof.
- Re-open `/about/` before a second ping check. A leftover timer from an earlier click makes the idle assertion fail.
- The middle block in the title row is `hidden` below `md`. At 1280×900 the live count is 7. A narrow viewport still has that node in the DOM, but its box can be empty and the click fails.
- Clicking SEND MESSAGE would hand off to a mail client. The href is the proof.

# Warp bays

Warp bays let a reader open the tag index, enter the CURSOR bay, and open a level from that bay. The same bay is reachable from a tag chip on a level.

## Sub-features

- `bays-index` lists one pipe per tag at `/tags/`.
- `bays-cursor` opens the CURSOR bay and shows its levels.
- `bays-chip` opens that bay from a level chip.
- `bays-back` returns to the index with ALL TAGS.

## How to get to it (user POV)

- Choose `EXPLORE WORLDS` on the title screen.
- Choose `TAGS` in the desktop HUD.
- Choose a tag chip on a level card or on an open level.
- Open `/tags/` directly.

## Driving it with verify-jorgeherrera-me

Preconditions:

- Doctor prints `ok` for this `VERIFY_RUN_ID`.
- The CURSOR bay still contains the level "Cursor Projects nailed it". If that level is gone, stop and report the unmet precondition.

- **Open the index from the title screen.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser open --path /` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "EXPLORE WORLDS" --wait navigation`. The printed URL pathname is `/tags/`.
- **HUD entry.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser open --path /` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "TAGS" --wait navigation`. The printed URL pathname is `/tags/`.
- **See the CURSOR pipe.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser has --role link --name "View 4 articles tagged with CURSOR"`. The command prints `found 1`.
- **Enter the bay.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "View 4 articles tagged with CURSOR" --wait navigation`. The printed URL pathname is `/tags/cursor/`.
- **See the bay title.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser has --role RootWebArea --name "Underground: CURSOR"`. The command prints `found 1`.
- **See a level.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser has --role link --name "Read: Cursor Projects nailed it"`. The command prints `found 1`.
- **Open that level.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "Read: Cursor Projects nailed it" --wait navigation`. The printed URL pathname is `/blog/cursor-projects-nailed-it/`.
- **Chip entry.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser has --role link --name "View all articles tagged with Cursor"`. The command prints `found 1`. Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "View all articles tagged with Cursor" --wait navigation`. The printed URL pathname is `/tags/cursor/`.
- **Back to the index.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "ALL TAGS" --wait navigation`. The printed URL pathname is `/tags/`.
- **Proof.** On `/tags/cursor/`, before opening a level, run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser snapshot --aria --path artifacts/verify-jorgeherrera-me/$VERIFY_RUN_ID/warp-bays/cursor.aria.txt` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser screenshot --path artifacts/verify-jorgeherrera-me/$VERIFY_RUN_ID/warp-bays/cursor.png`. The snapshot contains `RootWebArea "Underground: CURSOR"` and `link "Read: Cursor Projects nailed it"`.

## Gotchas

- The pipe's accessible name includes the live article count. `View 4 articles tagged with CURSOR` matched the checkout this map was seeded from. A new post tagged Cursor changes the name, and this journey fails. Report the name `browser has` could not find. Do not guess a nearby count.
- Singular counts use `article`, not `articles`. `View 1 article tagged with JAVA` is the pattern.
- Index pipes uppercase the tag (`CURSOR`). Chips on a level keep the frontmatter text (`Cursor`) and say `View all articles tagged with`. Related levels say `View articles tagged with`, without `all`.
- An empty tag list would show the text `NO TAGS YET`. This checkout is not empty. Do not treat that empty state as verified.

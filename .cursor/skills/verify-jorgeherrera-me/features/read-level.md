# Read a level

Read a level lets a reader open one post from the level list, follow a wikilink to another post, inspect related levels, and return to the list.

## Sub-features

- `level-list` lists every post at `/blog/`.
- `level-open` opens "Definitely disappointed with Claude Projects".
- `level-wikilink` follows the alias "disappointed from the very beginning" to the earlier post.
- `level-related` opens the same earlier post from RELATED LEVELS.
- `level-back` returns to the level list.

## How to get to it (user POV)

- Choose `VIEW BLOG` or `VIEW ALL` on the title screen.
- Choose `BLOG` in the desktop HUD.
- Choose a level card's title or its `Open article <title>` control.
- Open `/blog/` directly.

## Driving it with verify-jorgeherrera-me

Preconditions:

- Doctor prints `ok` for this `VERIFY_RUN_ID`.
- `src/content/blog/Definitely disappointed with Claude Projects.md` is still in the checkout. If it is gone, stop and report that unmet precondition. Do not substitute another post.

- **Open the list from the title screen.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser open --path /` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "VIEW BLOG" --wait navigation`. The printed URL pathname is `/blog/`.
- **HUD entry.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser open --path /` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "BLOG" --wait navigation`. The printed URL pathname is `/blog/`.
- **Find the fixture post.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser has --role link --name "Open article Definitely disappointed with Claude Projects"`. The command prints `found 1`.
- **Open it.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "Open article Definitely disappointed with Claude Projects" --wait navigation`. The printed URL pathname is `/blog/definitely-disappointed-with-claude-projects/`.
- **See the title.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser has --role heading --name "DEFINITELY DISAPPOINTED WITH CLAUDE PROJECTS"`. The command prints `found 1`.
- **Wikilink target.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser attr --role link --name "disappointed from the very beginning" --attr href`. The href that proves the link works is `/blog/disappointed-with-claude-projects/`.
- **Follow the wikilink.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "disappointed from the very beginning" --wait navigation`. The printed URL pathname is `/blog/disappointed-with-claude-projects/` and the heading is `DISAPPOINTED WITH CLAUDE PROJECTS`.
- **Return and open related.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser open --path /blog/definitely-disappointed-with-claude-projects/`. Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser has --role heading --name "RELATED LEVELS"`. Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser attr --role link --name "Disappointed with Claude Projects" --attr href`. The href is `/blog/disappointed-with-claude-projects/`.
- **Back to the list.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser click --role link --name "Back to level selection" --wait navigation`. The printed URL pathname is `/blog/`. The visible words on that control are `BACK TO LEVELS`. The accessible name is `Back to level selection`.
- **Proof.** On the open post, before following the wikilink, run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser snapshot --aria --path artifacts/verify-jorgeherrera-me/$VERIFY_RUN_ID/read-level/post.aria.txt` and `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs browser screenshot --path artifacts/verify-jorgeherrera-me/$VERIFY_RUN_ID/read-level/post.png`. The snapshot contains the post heading and `link "disappointed from the very beginning"`.

## Gotchas

- The level list has no page heading. The post titles are the landmarks.
- The wikilink step is the success condition, not the relative URL currently written into the HTML. On the checkout this map was seeded from, `browser attr` printed `Disappointed%20with%20Claude%20Projects` for that alias, and the same kind of raw title for `Cursor Projects` and `Grok Bot`. Following that relative URL does not open the other post. Report the failure. Do not change the expected href to the raw title to make the step pass.
- The related-level link uses the post title and already points at `/blog/<slug>/`. A passing related link does not verify the wikilink.
- Card tag links on the post use `View all articles tagged with Claude`. Related-level tag links use `View articles tagged with Claude`. They are different names.

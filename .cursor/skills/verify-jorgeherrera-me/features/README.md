# jorgeherrera.me verification map

This directory is the maintained source for verifying the reader-facing behavior of jorgeherrera.me. Read this index, then use the matching feature file as the recipe.

## Baseline preconditions

- Export `VERIFY_RUN_ID` to a short new id before any command.
- Launch with `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs launch`.
- Leave `VERIFY_PORT` at `4473` unless that port is already taken. A second run needs its own port and its own id.
- Require `doctor` to print `ok`, the preview origin, and `marker JORGE HERRERA`.
- The viewport is 1280×900. The desktop HUD links `BLOG`, `TAGS`, and `ABOUT` are present at that width.
- Never drive a server this run did not start. `astro dev` is not a verification server.
- Never run `npm run sync-blog`.

## Driving conventions

- Start every recipe from `/` unless its preconditions name another path.
- Prefer `--role` and `--name` over a CSS selector. The question blocks are the exception. They have no accessible name.
- Treat every command as literal. Keep quoted names and flags unchanged.
- Run browser and HTTP actions through `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs`.
- Paths in commands are relative to the repo root.
- Do not delete proof artifacts during cleanup.

## Proof and skip reporting

- Capture the reader action and the resulting state, not only the final screen.
- UI proof includes an ARIA snapshot and a viewport screenshot.
- HTTP proof includes the status, content type, and saved body.
- A class change is proved by printing `className` before the click, during the effect, and after it ends.
- Record the feature id and the entry point with every artifact.
- Report an unreachable path with the command that failed and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Feature entry contract

Each feature file starts with an H1 and one paragraph of reader-visible behavior. It then uses these four H2 sections, in order.

1. `Sub-features` lists short ids with one line each.
2. `How to get to it (user POV)` lists every reader entry point.
3. `Driving it with verify-jorgeherrera-me` starts with `Preconditions:` and pairs each action with a command and an observable result.
4. `Gotchas` lists traps that waste or invalidate a run.

## Features

- [Title screen](./title-screen.md) covers the homepage controls, the latest-level cards, and the pipe into the Level Editor.
- [Read a level](./read-level.md) covers the level list, one post, its wikilink, the related levels, and the return to the list.
- [Warp bays](./warp-bays.md) covers the tag index, one tag bay, and the tag links on a level.
- [Question blocks](./question-blocks.md) covers both ways onto the about page, the ping animation, inert blocks, and the contact links.
- [Level editor](./level-editor.md) covers arrival at the splash. It does not cover publishing.
- [Feed](./feed.md) covers the RSS document served beside the site.

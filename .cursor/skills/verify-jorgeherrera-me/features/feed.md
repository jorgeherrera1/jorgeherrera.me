# Feed

The feed is the RSS document at `/rss.xml`. A reader subscribes from that URL. The channel title is the site title, and each item's link is the absolute URL of a level.

## Sub-features

- `feed-channel` returns the channel title and an XML content type.
- `feed-item` lists the fixture post with its canonical link.

## How to get to it (user POV)

- Open `/rss.xml`.
- Follow the `alternate` link in the document head of any HTML page. That link's href is `https://jorgeherrera.me/rss.xml`.

## Driving it with verify-jorgeherrera-me

Preconditions:

- Doctor prints `ok` for this `VERIFY_RUN_ID`.
- The fixture post "Definitely disappointed with Claude Projects" is still in the checkout.

- **Fetch the feed.** Run `node .cursor/skills/verify-jorgeherrera-me/scripts/harness.mjs http get --path /rss.xml --out artifacts/verify-jorgeherrera-me/$VERIFY_RUN_ID/feed/rss.xml`. The command prints `status 200` and a `content-type` that contains `xml`.
- **Channel.** The saved body contains `<title>Jorge Herrera</title>` and `<link>https://jorgeherrera.me/</link>`.
- **Fixture item.** The saved body contains `<title>Definitely disappointed with Claude Projects</title>` and `<link>https://jorgeherrera.me/blog/definitely-disappointed-with-claude-projects/</link>`.
- **Proof.** The saved `rss.xml` is the proof. Record the status line with it.

## Gotchas

- Item descriptions are excerpts. They can still contain the characters `[[` from a wikilink in the markdown. A description that contains those characters does not fail the feed. The item `link` is the proof that the feed points at the level.
- The links are absolute `https://jorgeherrera.me/...` URLs even though the preview origin is `127.0.0.1`. Do not require the item link to use the preview host.
- The feed is generated at build time. A post added after launch is absent until cleanup and launch rebuild the site.

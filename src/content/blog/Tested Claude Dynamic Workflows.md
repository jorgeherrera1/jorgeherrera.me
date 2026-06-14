---
date: 2026-06-09
title: Tested Claude Dynamic Workflows
tags:
   - Claude
---

I tested [Dynamic Workflows](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code) and I still don't know what to think about it.

From the Engineering standpoint, it really looks impressive (at least from the distance). It brings deterministic workflows to the non-deterministic world of LLMs. 

On the other hand, it is token-intensive. I'm on the Claude Pro plan and it burned all the tokens of my 5h session in minutes. 

I know I maybe used a Ferrari to go to the grocery store that is just around the corner, but I would have expected Claude to adapt to the size of the problem. 

## Explaining the use case
I have a *Chief of Staff* built on Claude Code. It connects to different systems via MCP:
- Meeting notes from Notion
- PBIs from Azure DevOps
- Tasks from Todoist
- Projects from local filesystem

Every day, there is an automated *routine* called `daily-brief`. This basically pulls meeting notes, oversees progress against planned work, and uncover insights. 

There is obviously a deterministic workflow here. There is also some level of parallelization that can be achieved, so even though it is a very small use case, this is the first one that come to my mind to test dynamic workflows; so I did.




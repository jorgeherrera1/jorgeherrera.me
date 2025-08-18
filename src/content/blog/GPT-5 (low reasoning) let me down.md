---
title: GPT-5 (low reasoning) let me down
date: 2025-08-08
tags:
   - AI
---
## Simple monorepo migration

After all the type I watched about GPT-5, I wanted to give it a quick try. I have a very simple Nextjs application and I want to turn it into a monorepo structure. The objective is quite simple: there will be a second frontend app which will use the same schemas so as part of the monorepo change, the code needs to be refactored to extract the domain schemas and put them in a separate package that can be reused by the other frontend app. The prompt instructions were as straightforward as this simple explanation because I wanted the model to figure it out.

## Here we go with GPT-5
At first, I was amazed with the speed. It was moving very fast, making a lot of changes. I created a separate branch so I didn't bother reviewing the quality of the output... at least not yet. After about 15 minutes of work, I started to wonder if it was going well or not. I found it strange that the monorepo structure was not even created yet, but hey! I'm not the expert. 

### What's going on?

It was over 40 minutes and it was still running doing changes. There were over 80 changes shown on git, and still the monorepo structure was not there yet.

I couldn't watch it finish because Windsurf cut the process indicating that I no longer have access to that model. I did an exploratory review of the changes and it didn't do anything. It was chasing some rabbit hole.

## Back to Claude Code using Sonnet 4
I pasted the same prompt to Claude Code using planning mode, and it came back with a way simpler and (almost) straightforward approach.

During implementation it is following a messy approach keeping some files at root level while moving others without applying any type of logic so I'm having to stop, correct and continue, but the plan was way better compared to GPT-5. The implementation was also better even though I did have to intervene. 

I wonder how much of a difference would have been with GPT-5 high reasoning model. 
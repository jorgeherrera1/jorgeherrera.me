---
title: Lessons I'm learning with AI coding
date: 2025-08-19
tags:
   - AI
---

I'm having a really hard time refactoring an application that was mainly written by AI. It's a very simple career path management system with just a few models (job profiles, skills, etc.).

I used the BMAD framework to test its method to create robust apps and while I have mixed feelings about it (mostly good), there are many fine-tuning details that you need to take care of yourself otherwise you end up like me. 

## Context Engineering is a must
When I started with the BMAD method for writing this app, I relied entirely on the architecture documentation it generated. The problem is that I'm too picky and my different interventions caused the BMAD agents to go off track and some of these technical requirements were just forgotten.

Then I read the official Claude Code documentation about how to use their `CLAUDE.md` files and I did not realize how much value this provides to the software process. This is laser-focused instructions for the LLM that works (mostly) every time.

These small docs that become part of the context need to be treated as first-class citizens and updated often. Lesson #1.

## Architectural little details
Then once you start writing code, there are patterns that you need to establish **BEFORE** you get carried away writing a lot of code. I made that mistake and I regret not stepping in early to make those decisions on behalf of the AI. 

### API definition
I knew from the very beginning I wanted to expose a REST API using OpenAPI. Yet I focused so much in the frontend functionality that I forgot I needed to define the contract.

Now I'm going backwards, changing what the AI defined and having to jump between the OpenAPI spec, the Zod validation schemas, business logic, and frontend components. So much valuable time would have been saved if I had defined the spec first.

### Zod Schemas & TypeScript interfaces
I did not pay any attention to this and what ended up happening was the AI creating different versions of the same schema. Schemas to validate specific frontend functionality such as forms were mixed with schemas related to the business models. 

It was way worse with TypeScript interfaces. To avoid type-check errors, the AI created whatever was *needed* by the file on hand. And when I say *whatever* it was one or more duplicate interfaces on every single file. This is still one of things I'm trying to clean.

#### Type-Checking Hell
I neglected linting and type-checking early in the process so maybe it's on me. But this is another part of the workflow and development patterns that need to be documented and enforced for the LLMs to follow. Now I have over 100 errors that I'm being lazy to fix. 

### Separation of concerns
It literally just happened as I write this. I created a *service* layer to manage persistence and business logic. Then as I had no instructions on my separation of concerns, the LLM added the Prisma query directly to the NextJs route.

But this goes beyond the above situation, the LLM created different conflicting patterns of data fetching. Some using Zod schemas, some using made-up TypeScript interfaces for the task on hand. Some put the logic entirely in the NextJs route, some inconsistently segregated the logic in different places. 

## Frontend

### Tailwind
The LLMS are decent when it comes to using Tailwindcss utility classes but they **suck** creating a reusable design system. They suck big time. Not only do they have outdated knowledge (v3) but I don't think they apply the knowledge effectively.

This also happens with the combination of Shadcn/ui, I regularly had issues with the model creating custom styles instead of using tailwind @theme.

### TypeScript Interface duplicates everywhere
I'm still surprised on how many duplicate TypeScript models were created everywhere. Even when I created a specific package in my monorepo to serve as a shared data model, the AI created silly copies of different data models. 

### React SSR
Even when I was using the latest version of NextJS, which supports React Server Components and the React's newest features, the knowledge of the LLM decided to do everything client-side. 

## Unit and Integration testing
There were no predefined patterns on testing. The LLM just went crazy and defined tests to pass whatever code it was writing, even when it was wrong.

Any type of differentiation on what 'unit' and 'integration' mean was non-existing. Folder structure and file naming conventions was not existing. This one is on me obviously because I focused so much on the functionality of the MVP that I neglected unit testing. I'm ashamed of writing this, but that is the truth.

## How to feed Claude with knowledge
Even though I have been using Claude Code for a few months now, I'm still trying to figure out my own way of feeding Claude Code's memory (`CLAUDE.md`).

All this learnings need to be documented in a structured way so that Claude follows my code preferences. However I don't want to put everything in `CLAUDE.md` file. I want to create my own `docs/` that are model-independent and then simply reference them from whatever tool I'm using. 
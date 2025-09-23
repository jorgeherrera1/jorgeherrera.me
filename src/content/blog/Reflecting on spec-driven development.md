---
title: Reflecting on spec-driven development
date: 2025-09-22
tags:
   - AI
---
This is a follow up on my exploration of GitHub spec-driven development framework Spec-Kit. But rather about speaking about what works and what does not work, I'm just reflecting on the purpose of spec-driven development.

Spec-driven development is just a fancy name for something that has existed in software engineering for centuries:
1. Requirements analysis
2. Technical Design
3. Implementation

We call it now spec-driven only because we write the documents in markdown format and feed it to AI models to generate code. It's silly once you think about it. 

These frameworks (or tools in the case of Kiro) give you a structured approach towards the same steps I list above, but my reflection goes beyond the value they provide (I acknowledge they do, and I like them). 

My reflection is that if I have in my head what exactly I want to build, I have enough knowledge and experience to define the architecture on my own, and I think *these frameworks can be overkill*. What prevents me from documenting my stack in a file called `docs/tech.md`? I can easily create my `CLAUDE.md` file referencing other architectural rules, conventions, constraints for the AI model. I can write my own `product.md` describing the high-level purpose of my project. I can put (some of that) that in context every time I need it on my own. The *plan mode* of Claude Code is freaking good, IMHO.

Maybe spec-driven is just for vibe-coders or lower level developers that need this type of aid. Maybe I'm one of them. I'm learning a lot through testing all these tools but honestly sometimes I'm just faster and efficient setting the rules myself, putting a plan together, and keep everything manageable in small chunks. 

That leads to another question: how big should the spec be? BMAD kind-of forces you to breakdown functionality in small pieces (Epics, User Stories, Tasks). But then it can feel waterfall-ish. Kiro is probably the best implementation of spec-driven development, not only because it is already integrated in the IDE but because the templates are simple, and the scope kind and breakdown of tasks adjust depending on how big your change is. I'm still figuring out GitHub spec-kit. What's the right size? I tried something big and it delivered something that does not work. But then something small feels overkill. I like them all but they seem to shine under different circumstances. One is not necessarily better than the other. 

I wonder if for enterprise software, it would be better off to do that context engineering *by hand*, and then let the AI models enforce these rules and requirements.
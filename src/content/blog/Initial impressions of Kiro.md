---
date: 2025-07-15
title: Initial Impressions of Kiro
tags:
   - Spec-driven Development
   - Kiro
---

After testing Kiro for about an hour or so, I must admit that I kind of liked the experience of the spec-driven approach it takes to implementing features.

I've been playing and experimenting with [BMAD Method](https://github.com/bmadcode/BMAD-METHOD) for about 2-3 weeks developing an internal project for the company I work for so I was already familiar with the concept of providing *enough* specs to the LLM so they can be more effective when implementing the features.

The fact that Kiro integrates this into the IDE and walks you through the steps reduces a lot of the friction of having to remember to switch agents in the BMAD method.

I liked how Kiro uses the basics of software development any software development process and divided the specs creation in three:
- Requirements (business)
- Design (architecture)
- Tasks (checklist of tasks to accomplish the feature)

Also I liked the section they called *Steering Files* which are always pulled into the context. These *Steering Files* contain super high-level definitions to guide the whole process:
- Product (what the product is about)
- Structure (how code is organized)
- Tech (tech stack)

One question that I still have is how this can be combined with enterprise software development. Kiro saves new requirements in a folder within `.spec/`, however, requirements will *always* live in Project Management tools like JIRA or Azure DevOps, so they still need to be connected somehow. Also, maybe adding a timestamp to the folder created by Kiro to save new requirements could help make it easier to identify the timeline of features for easy identification.

The Requirements phase was straightforward. Kiro successfully translated a simple request into well structured requirements. The Design Phase was just okay. I believe this is not a problem specific to Kiro but it's related to how LLMs tend to over-engineer the solution adding unnecessary complexity.

Following the prescribed process was easy because Kiro includes a button in the Agent panel to take you to the next phase once you are okay with the results. In my case I did intervene manually on a few things related to requirements and design, and when I was satisfied I clicked this button to go to the next phase.

There is also a *Start Task* clickable link present in the Tasks file that you can use to start work on individual tasks. This is also another way to prevent the LLM to work on a large number of things so you keep the scope small and focused. It does take a bit more time when you go one by one, but I believe the implementation was quite good.

The verdict: I will definitely keep playing with it.
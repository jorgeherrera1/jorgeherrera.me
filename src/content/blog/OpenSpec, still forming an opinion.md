---
date: 2026-06-13
title: OpenSpec, still forming an opinion
tags:
  - Spec-driven development
  - OpenSpec
---

I'm still a supporter of Spec-driven development approaches. Even though harnesses are getting better and better, I still believe they level up the field for not so skilled engineers. I include myself in that group sometimes. 

## How OpenSpec works

It kinda innovates in the spec-driven development space (AFAIK) by turning specs into real documentation on how the system works.

It still has the spec-driven part like other Spec-driven methods but it incorporates the changes into a general *spec layer* that serves as living documentation of the project capabilities. 

You start with `/opsx:propose` to specify what you want to build. Then you implement by invoking `/opsx:apply`. Finally, you run `/opsx:archive` which incorporates the changes into the general `spec layer` that document how the system works.

## It requires discipline

This is the part that bothers me. I used to incorporate what I thought was a simple change to Cursor Analytics dashboard. Basically, I needed to report token spend on the different billing groups we have on our Cursor Enterprise account. The AI made a few mistakes here and there, which I had to spend time fixing. Since I needed to consult Cursor API docs and I'm lazy to do it myself, I tasked the AI to do it for me to validate the outputs against what we were reporting, this means I consumed three different chat sessions and two full context windows.

Yeah, maybe I did it wrong. Maybe I was lazy or I trusted too much on the AI model. Whatever the case may be, the implementation ended up beinf different to the spec. Obviously I'm testing OpenSpec so I was aware I needed to retrofit the changes into the specs, but I lost confidence on the process.

Not all people will be disciplined to do it. This means the implementation will start drifting from the *living* documentation. Documentation that I ask myself, who will read it anyway? Given the scenario I painted above, I would prefer to ask targeted questions to Cursor or Claude instead of spending time reading long "living" docs that might be inaccurate in the first place.

## Forming an opinion

I still need to do more with it. I still need to spend the time I did back then with other methods like BMAD, Spec-Kit and AgentOs.

The opinion I'm writing might be premature. The framework is lightweight. I just keep asking myself how valuable it is to have those living docs. It's something that sounds pretty. Before the AI era, when you had to work with a brand new codebase, you beg for some documentation to exist. Is this still the case? I don't think so. If I'm a seasoned Java developer and I have to work on a Java codebase with zero docs but I have access to Cursor or Claude Code, I would be very confident of my skills augmented by AI. Those are the thoughts that made me hesitant of approaches like this. But maybe I'm wrong. 
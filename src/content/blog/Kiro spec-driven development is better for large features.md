---
date: 2025-07-21
title: Kiro Spec-driven Development is Better for Large Features
tags:
   - AI
---

So I kept using Kiro today to test something that I thought it was a good idea but maybe it was overkill to use Kiro's spec driven development.

## A bit of context

I'm developing an application using React and NextJs using the BMAD Framework. While this is not a technical review of the BMAD method, I do have to say that I found a few inconsistencies on the code, such as:

- Client components used where SSR should have been used (especially at page level)
- Mutations done using hooks instead of server actions.
- Inconsistent API structure (duplicating Zod schemas, some schemas being put in an incorrect place of the flow, etc.)

This is not the fault of BMAD but a combination of the knowledge of Claude, plus the lack of specification of BMAD, plus the lack of proper review on my end letting some of this stuff pile up. To be fair, the responsibility should fall mostly me, but hey, that's the point of testing this stuff, I need to give it some freedom.

## Using Kiro to do this research

So I created a super detailed prompt with examples of these inconsistencies. My goal was to use Kiro's Spec driven development to create a very detailed report that would show me "visually" what architectural changes needed to be done so that SSR used where it should, find opportunities to use server actions, and so on and so forth. I was explicit that I did not want to code anything just produce a user friendly report.

Kiro did a good job listing the requirements. I was excited where this was going so far. Then I moved to creating the design and that's when I felt it was boiling the ocean. I let it go though. I wanted to see the result. I'm curious. 

Kiro designed a set of audit scripts to gather the info I was asking. It over-engineered the research, but since I already said I was curious and I wanted to see the report, I did not change the design.

## Too much horsepower

The process of creating the scrips designed by Kiro took about one hour. Maybe a bit more. When I ran the scripts, I was very excited to see the report. I was really hoping that the over-engineering would yield some spectacular results. It was not the case. Sadly, the report barely provide actionable insights. I ended up reverting to my previous commit, throwing all this work to the trash can.

## Lessons learned

I already knew but I still wanted to proceed out of curiosity. Kiro spec driven development is best suited for actual feature development, where a lot of thought and detail into the requirements and design are necessary. Otherwise it will over-engineer a solution that is not really needed.

Hidden lesson learned that I should know by now is that human intervention is still needed to correct course. In this case I was curious and interested on the output so I wasted my own time but I knew from the very beginning that this approach might not work.
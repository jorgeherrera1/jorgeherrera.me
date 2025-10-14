---
title: Impressed with Agent OS efficacy
date: 2025-10-14
tags:
   - AI
---
## Gave up on GitHub Spec-Kit
After more than a month testing GitHub Spec-Kit, I decided to take a rest from it. It has potential but it consider it immature compared to other options on spec-driven development (BMAD, Kiro).

## Trying Agent OS
I came across this framework on YouTube and I browsed their source code and I found it interesting so I put it on my list. This one was supposed to go next instead of Spec-Kit but I gave preference to the big GitHub word behind the name and keep Agent OS in the list until now. I wish I did differently. 

## Agent OS First Impressions

### Global Installation
The process was very simple as documented on their website. You use this *home* installation to document your tech stack, conventions, rules, guidelines, etc., being honest, I kind of disliked that it performs an install in your home directory. Just not a big fan of things that use my home directory and put things there. 

Initially, I thought that the framework would read from that installation folder so I thought *"hey, things should be documented in the project, not outside of it"*; I was wrong, though, what you define in the home directory gets copied to the project when you install Agent-OS at project level. 

It gives you the ability to define different profiles, which could be useful. It's probably convenient to avoid repeating yourself across different projects, but I'm still on the fence putting those type of things in my home folder. I'm nitpicky, yes, I am.

### Defining Stack and Conventions
Putting aside my repulsion to the `$HOME/agent-os` installation, I really liked how stack and coding rules was organized in multiple folders and multiple files. The framework has folders for frontend, for backend, for database, etc. Within these folders there are a few small files with some defaults. For example, defaults for API development or CSS development. The defaults offered by the framework are minimalistic and straight to the point. Minimalism is appreciated in a world of AI-generated stuff. It could have been bloated by default.

### Project-level Installation
Installing Agent OS in a project is also very simple. You just run a script and the necessary files get copied over from the home directory. It copies tech stack, coding rules and also creates *commands* and *agents* that are part of the workflow.

I wished technical specifications related to your project as well as coding guidelines were documented in the `docs/` folder of my projects, instead of the `agent-os/` project folder.

### Defining Product
The first command you use is `plan-product`. I liked how it picked up the definition of my product from `docs/product.md` folder. But this is again when I wish this type of stuff goes in the `docs/` folder, because now I have product definition duplicated in two places.

As part of the `plan-product`, it also generated a `roadmap.md` file, which is basically a prioritized checklist of features. I guess is fine and convenient if you are working solo and want to go fast, but on enterprise projects, you typically work off project management tools where work is broken down and documented as backlog items, not a list in a text file. You are not forced to work off the roadmap, though. You can create new feature that are totally unrelated to the roadmap.

### Creating my first Spec
I followed the official documentation of Agent OS otherwise it would have been hard to figure out which command to run first. There are two nearly identical commands by name `new-spec` and `create-spec`. Why one to choose? 

When I ran the `new-spec` command, I gave no requirements and I liked that it picked the next item in the priority list of features in `roadmap.md`; but, as mentioned earlier, you are not forced to follow that list, you can pass a totally different new specification.

I also liked how the creation date is encoded into the name of the folder containing the spec definitions. This is better than (the last time I use) Kiro, which simply created folders for the spec names, and it is difficult to figure out the order of creation.

Agent OS leverages Claude Code subagents and delegates to an `spec-initializer` and `spec-researcher` to start writing the spec details. I haven't read the code and I assume they are there for a reason, it just felt over-engineered at first.

If I compare commands: `new-spec` of Agent OS vs the `specify` command of GitHub Spec-Kit, `new-spec` feels a lot smarter than `specify`. 

The `new-spec` did something interesting. It created an `initialization.md` file with the details that I gave, then it created another file called `requirements.md` with a lot of duplicate text. I questioned why because I know LLMs sometimes do things differently, but apparently this was expected, and this initialization file is some sort of initial knowledge provided to `spec-initializer` which then gets picked up by the `spec-researcher` to create the `requirements.md`, and since I gave a lot of details, the LLM just thought they were good enough that it ended up using them to document requirements.

The `requirements.md` file ended up being very long, and I was expecting to see something more laser-focused on requirements but it also included technical details. Still, the way requirements were documented was very interesting. The `spec.md` also includes a mix of user stories and technical notes for the LLM similar to how BMAD defines mixes the user story definition with technical details of the implementation. There are some pros and cons to doing this, and maybe I still prefer how elegantly Kiro separates requirements from technical design. 

Speaking of Kiro, the `tasks.md` file looks very similar to what Kiro defines with a top level task and a few sub-tasks. The acceptance criteria of each task group was a bit vague, IMHO with just phrases like *"Visual feedback during regeneration"* instead of a proper acceptance criteria requirement *"WHEN user changes requirements AND goes back to the architecture tab THEN visual feedback is provided that architecture is regenerating"*.

### One-shot Implementation
I have been very busy with work so I used the `implement-spec` to build the whole thing at once. I typically prefer to do small batches to avoid polluting the context of the LLM but I wanted to compare the efficacy vs GitHub Spec-Kit.

Agent OS distributes the work to Claude Code sub-agents which I think it is very interesting compared to what I have seen before (supposedly the new BMAD will also use Claude Code sub-agents). I wonder if that approach truly achieves higher precision.

Side note regarding implementation is that how you run the spec-driven steps inside Claude Code is very different compared to Cursor, for example. The reason is the multi-agent support. If I use Cursor, I have to run more commands. I with the DX would remain the same regardless of where you use it. 

The implementation took forever. I am on a Claude Pro subscription and I ran out of credits before the spec was implemented. I could not measure how long it took to implement because weekend came and I did not pay attention at all to the execution time.

Something to criticize is that all E2E tests failed but it still told me the implementation was completed. I guess part of it can be blamed on the LLM.

Overall, I was **very** impressed. It took a lot of time but the feature worked. I just needed one shot and it did it. I did several specs with GitHub Spec-Kit, took the same amount of care and time to define the requirements, technical specs, etc., and all of these attempts were unsuccessful requiring me to fix things manually just to make it work as defined. Agent OS did it in one shot. Impressive. 

From the code quality standpoint, it seems it did follow the architecture but I haven't reviewed the code yet so I'm sure I will find things I will not like, but still, it worked in the first attempt. 

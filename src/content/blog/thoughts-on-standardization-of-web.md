---
title: Thoughts on Standardization of the Web
date: "2022-12-27"
---

Today the web is living such golden days: frameworks are mature, build tools and bundlers are amazing these days, dev tools (such as VS Code) are in a good shape. New developers may not know but creating web apps years ago was very painful; JavaScript accumulated some hate because of that, probably some with good reasons.

If I remember 12 years ago, I was using jQuery all over the web because the browser APIs were honestly poor, and some of the APIs we use today did not even exist. If I wanted to have components, a wise choice back in the day was using jQuery UI. It was not that bad, really, although other more experienced web developers were probably using Knockout or Ember.

Taking aside the APIs, having differnt browsers to support was a pain. CSS rendered differently. Supporting them all was mission impossible. Supporting IE alone was not easy.

The arrival of NodeJS changed the game, IMHO. Not only was it a very interesting platform for the backend but also enabled a lot of tooling for the Web. If you think about `create-react-app`, it relies on NodeJS to bring dependencies, bootstrap your project among other things, even though it is a frontend app you are creating.

Having the possibility of using the same language on frontend and backend was nice. In regards of tools, frameworks, etc., NodeJS was way behind other platforms such as Java and .NET. However Java and .NET still required fat Application Servers and NodeJS felt so lightweight to run a backend. Today, NodeJS is caught up mostly.

And today, APIs in the browser are modern, easy to use. Usage of jQuery is not well seen. CSS has become better and better. NodeJS usage is so widespread that innovation has started to slow down (obviously!).

What could be next? I've heard people saying that the APIs for the web should work the same on frontend and backend. I do not know if that is even possible but that only means more standardization which is mostly good but has its downsides. I come from the Java world, and I remember how slow the JCP was to decide on improvements to the language and APIs (IDK if this has improved). If there is something that needs to work on both frontend and backend, I imagine these improvements would slow down to avoid breaking stuff, same way it happened with Java and the JCP.

In regards to the backend, we're already starting to see 'clones' of NodeJS such as Deno and Bun. In order to support NodeJS apps, they are supporting NodeJS APIs, which kind of makes NodeJS as the de-facto standard for Backend JavaScript, at least today. But as these new platforms gain adoption, maybe fragmentation will occurs as an inevitable result, which is not necessarily be bad because inovation would probably go faster and the one doing it better will gain more adoption. For instance, Deno and Bun support TypeScript out of the box, whereas in NodeJS, that is not the case.

I'm excited with the possibility of having a single JavaScript API that could run in any backend runtime but at the same time I fear a little bit that all these wonderful new things that have been happening so far will not be the same. I got away from Java because of that reason. I still like Java a lot but as someone who likes to learn new stuff regularly, JavaScript was more appealing. In the end I think the Web (and everybody who creates it) has figured out the way forward and I'm hoping that continues for a long time, even if more standardization happens in the backend.
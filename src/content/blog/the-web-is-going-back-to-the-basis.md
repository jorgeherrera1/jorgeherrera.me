---
title: The Web Is Going Back To The Basis
date: "2022-11-22"
---

It is very interesting how things evolve over time; most of them becoming more and more complex. The web is a very special subject for this conversation because it has become both simpler and more complex depending on the angle you see it. 

Travling to the 90s we had pages and links to other pages. All 'boring' static content. Not much to show off here. Later on, a little more sofisticated sites were generated on the server using languages such as PHP. Still requiring request/response on every page rendered but despite PHP being demonized over bad devs mixing business logic with presentation, coding PHP apps was highly satisfactory.

As the web started to evolve real desktop-like apps started to proliferate: Single Page Applications (SPAs). I remember how amazed I was when I saw Gmail for the first time. Then developers could create not only web sites but web apps. It was not easy, though. During those 'tough' times jQuery was there as your friend for both DOM manipulation and AJAX calls. JavaScript was reviving!

And the web continued to evolve and we could develop apps that would render in many different devices using the same codebase. The browser APIs only got better and better. Awesome frontend frameworks such as React and Angular started to dominate the web landscape. And the web platform (HTML+CSS+JS) continued to get better and better.

But now think about web applications today. Most of them are a real piece of engineering. Despite SPAs being 'cool' they had the little problem that some of them were not searchable by Google (and other search engines) (because all the SPA content was generated upon user interaction) producing poor SEO rankings.

And then we started talking about Server-Side rendering. Wait! Is that not the way apps were created before with PHP? SSR is just a prettier name for something that has existed for years with the only difference that now it's being written in JavaScript. Purists will say I'm wrong because it involves more complex stuff like hydration, but all it really is a page generated in the server before it is sent out to the browser, just like in the old PHP days.

So with SSR, now we could obtain better SEO rankings but we got into other engineering problems such as hydration, slower page loads, and the fact that the DOM truly only exists in the browser. But JavaScript, frameworks and tooling only got better and better. So on one hand we have some very interesting and challenging problems and on the other we have an amazing web ecosystem to find the way around it.

At this point we already went back in time to PHP-like apps. Yeah, slighly different but same idea that the server generates the page... but that's not it, now you can generate static content off the different data sources to produce something like in the 90s that renders really fast and is very friendly with search engines, with the added benefit that the page can still be highly interactive. Tools like Gatsby makes this easy to accomplish. 

It's funny because after all these years of evolution, we are going back to the basis.
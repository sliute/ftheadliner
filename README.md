# FT Headliner

A tech test for FT.com

## Brief

```
Build a website that shows a list of news headlines from Financial Times. You may use our Developer APIs to achieve this.

Provide a search box for users to search for headlines containing specific words (i.e. searching for "brexit" should return a list of brexit-related headlines).

Optionally, provide pagination for results, at 20 results per page.

This website should be:
- Server-rendered
- Progressively enhanced
- Responsive
- Accessible

For bonus points, the site should:
- Be built using Javascript and node.js
- Be deployed on Heroku
- Not rely too heavily on client-side frameworks (i.e. Angular, React) or libraries like jQuery
- Have a similar look and feel as ft.com
- Be performant over 3G networks

It'd be really awesome if, on top of all that, your site:
- Uses Origami Components
- Works offline
```

## User Stories

```
As a user,
So I can quickly browse FT.com's headlines,
I want to see a multi-page list of headlines, newest first, with 20 results per page.

As a user,
So I can see all FT.com's headlines on a specific topic,
I want to be able to search by keyword and see a multi-page list of results, with 20 results per page.

As a user,
So I can access all the headlines or search results,
I want to be able to move across pages.

```

## Technology

* Node
* Express + Pug
* Dotenv
* Mocha + Chai

I have used neither client-side frameworks (e.g. Angular, React) nor jQuery or other similar libraries.

## How to Use

The app is available on [Heroku](https://ftheadliner.herokuapp.com/). The design derives from o-teaser's [Small-Full-Fat](https://www.ft.com/__origami/service/build/v2/demos/o-teaser@1.11.2/small-full-fat) component.

To deploy, test and use it locally:
```
$ git clone https://github.com/sliute/ftheadliner.git
$ cd ftheadliner
$ npm install
$ npm test
$ npm run dev
$ open http://localhost:3000

```

Pre-requisites for local use:
* all the above technologies, plus Nodemon
* an .env file with a valid FT API key

With Google's PageSpeed Tools, the [compressable]() app scores:
* 90/100 on desktop
* 74/100 on mobile, because of:
  - the render-blocking polyfill.min.js
  - the CSS delivery for Origami components

FT Headliner could work offline on Chrome with [this](https://codelabs.developers.google.com/codelabs/offline/index.html?index=..%2F..%2Findex#0) service worker.

## License

[MIT](LICENSE.md)

---
title: "React version 18: new features and updates"
date: 2023-11-15T14:53:15+08:00
image: /post/react18.webp
tags:
  - React18
draft: false
---
>React has come a long way in the past decade, undergoing significant transformations that have made it one of the most widely used front-end UI frameworks available today. 

Initially, React’s verbose syntax made it challenging for developers to work with. However, React introduced the JSX syntax, simplifying the creation of components. To follow, functional components with Hooks made it easier to handle state and life-cycle functions, leading to more elegant, readable, and maintainable code. With the introduction of server-side rendering (SSR) in React 16, performance improved by allowing faster initial page load times and better search engine optimization (SEO). And full-stack frameworks like Next.js and Remix have made React even more accessible, further increasing its popularity.


The latest version of the library, React 18, was released in March 2022. In this article, we’ll delve into its new features and explore the benefits for both users and developers. We’ll also look at how to implement these new features and discuss the exciting plans that the React team has in store for the framework’s future.


## New Features and Updates in React 18

React 17 was a “stepping stone” release, serving as a key preparation for the new features introduced in React 18. While no changes were made to the React developer API in React 17, it introduced ways to incrementally upgrade versions and the ability to run multiple versions of React within a single component tree. This was an important step toward the implementation of the updated features in React 18. Let’s dig into some of these key features and updates.

![react18](/post/react18-features.png) 

### A New Concurrent Rendering Engine 
React 18 introduced a new `concurrent rendering engine`, which has been optimized for both front-end and server-side rendering. This shift to concurrency streamlines the process of rendering the UI both on the server and the client side. As a result, users can interact with the page sooner, providing a smoother experience even on heavy data-centric pages. Much of this is implemented as part of the enhanced `<Suspense> `component. 

### Server Side `<Suspense>` Components
The use of server-side `<Suspense>` components has been optimized to facilitate partial server-side rendering and hydration. This means that only the “lighter” parts of the app are rendered on the server and sent to the client, allowing for an immediate page reload. On the client side, `<Suspense>`has been integrated with asynchronous data fetching, enabling the completion of data fetching and rendering of the heavier portions of the page. The end result is a reduction in waiting time and a smoother experience for users. 

### A More Responsive UI
The new interruptible rendering engine enables re-prioritization of the hydration of server-side components based on user interactions with the UI. Users can interact with the page before the HTML becomes activated with browser events. Depending on where a user clicks, React prioritizes that portion of the component tree, resulting in a snappier and more responsive UI.

### An Opt-in Upgrade Process
A top feature of React 18 is its opt-in upgrading process. By default, React 18 uses the React 17 rendering engine. The React team has accomplished this by introducing new core functions in their API, while still maintaining support for the old ones. To take advantage of the new features in React 18, developers must specifically use the new API functions. This approach enables developers to test their components and upgrade with minimal hassle, even if there are breaking changes involved.

## Concurrent Rendering in React 18
According to the React Blog, React 18’s rendering engine is designed to be seamless, allowing developers to focus on their application code without worrying about the rendering process. 

In most cases, the changes are made within the rendering engine itself and shouldn’t affect the code, with the possible exception of third-party library maintainers. 

The previous rendering engine in React operated as a single, uninterrupted, synchronous process that rendered the entire component tree. This meant that developers had to wait until the render was completed before any new changes could be seen. Such changes were scheduled into later render queues.

In contrast, the rendering engine in React 18 has been updated to be interruptible, resumable, and capable of discarding and replacing its resulting DOM. This update enables a more flexible and efficient rendering process. 

It’s important to note that React guarantees a consistent render. In practical terms, this means that if you use React without using external stores that require synchronization, React will handle rendering using its concurrent capabilities and guarantee consistent rendering. If you primarily write pure React using the useState hook, you can expect less waiting times with consistent results.

The main caveat is that maintainers of code libraries handle data fetching or state management differently, requiring a code rewrite to prevent inconsistencies. With this in mind, the React team made React 18 opt-in, allowing developers to test and upgrade components before fully adopting the new version. 

Now, let’s take a look at the new features that most React developers will likely use. 

## React’s <Suspense> Component on the Client Side
The <Suspense> component was introduced in React 16.6, but had a limited scope. It only worked with React.Lazy, which allowed components to be suspended while waiting for a specific bundle to load. However, it couldn’t be used for data fetching initially. This limitation has been addressed in the latest version of React, making it possible to use the <Suspense> component for data fetching. 

In essence, the <Suspense> component simplifies the asynchronous data fetching process and loading display. It can be wrapped around a component that handles the data fetching, enabling developers to display a loader component coded in a declarative way in their layout. 

Here’s an example of the previous method of incorporating loader logic within a component to display loading code:
```
import React, { useState, useEffect } from "react";
import axios from "axios";
import ListUniversities from "./ListUniversities";


const AsyncComponent = () => {


 const [loading, setLoading] = useState(true);
 const [data, setData] = useState(null);


 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await axios.get(
         "http://universities.hipolabs.com/search?country=United+States"
       );
       setData(response.data);
       setLoading(false);
     } catch (e) {
       setLoading(false);
       setData([]);
     }
   };
   fetchData();
 });
 return (
   <>
     {loading ? (
       <p>Loading please wait...</p>
     ) : (
       <ListUniversities list={data} />
     )}
   </>
 );
};
export default AsyncComponent;
```
Our App code will look like this:
```
import React from "react";
import "./App.css";
import AsyncComponent from "./components/AsyncComponent";


function App() {
 return (
   <div className="App">
     <h1>List of American Universities</h1>
     <AsyncComponent />
   </div>
 );
}
export default App;
```
In this example, the logic of the loader is hidden and not visible at the higher level, which is the App component. The AsyncComponent handles the display logic for the loader internally. 

Here’s the same App.js rewritten to use the <Suspense> component:
```
import React, { Suspense } from "react";
import "./App.css";
import AsyncSuspendableComponent from "./components/AsyncSuspendableComponent";


function App() {
 return (
   <div className="App">
     <h1>Suspense Example: Full List of American Universities</h1>
     <Suspense fallback={<p>Loading, please wait...</p>}>
       <AsyncSuspendableComponent />
     </Suspense>
   </div>
 );
}
export default App;
```
Now we can see the loading logic has been removed from within the Async component, which offers several benefits. 

Firstly, the loading logic is now independent of the data fetching component. This means that we can change the design of how an app displays loading sequences without having to modify the code of individual components.

Secondly, we can nest <Suspense> components within each other, allowing us to show a loader for an entire section, as well as for subcomponents with loaders. 

Lastly, the suspendable version of the data fetching component is now much cleaner and easier to maintain:
```
import React from "react";
import ListUniversities from "./ListUniversities";
import { fetchData } from "../lib/suspense-demo-api";
const resource = fetchData();


const AsyncSuspendableComponent = () => {
 const data = resource.data.read();
 return <ListUniversities list={data} />;
};
export default AsyncSuspendableComponent;
```
Please note that the example of a suspendable component implementation shown here is considered an “ad-hoc” implementation and is not recommended by the React team. If you’re interested in seeing how I implemented the data fetching (with help from this blog post).

Instead, the React Team recommends using frameworks that have already integrated the logic for data fetching with Suspense so you don’t have to implement it yourself. Here’s a partial list of React 18-compatible data-fetching frameworks and libraries, including Next.js, Gatsby, Relay and Apollo.

Lastly, the most exciting feature of <Suspense> is that it supports server-side rendering with the same syntax, making it easier to develop components that optimize data-rich pages. Let’s take a look at how SSR works with <Suspense>.

## Server-side Rendering with <Suspense>
Server-side rendering was introduced in React 16 and has primarily been used in larger frameworks like Next.js. One of the main advantages of using SSR was to improve SEO since client-side-only React apps don’t have HTML that can be read by web crawlers.

Another use case for SSR is providing a faster display of the app’s entry point by sending the HTML immediately. However, this method works best for pages that are mostly static to provide a good user experience. When an SSR page needs to include a lot of dynamic data, the user experience is not optimal.

### Server-side Rendering Before React 18
Before Reat 18, the entire SSR process (shown in the graphic) below had to be completed before the end user could interact with the page.
![A diagram of How Server-Side Rendering (SSR) worked before React 18](https://cdn-blog.scalablepath.com/uploads/2023/03/server-side-rendering-pre-react-18.png)


The server-side rendering process would fetch the necessary data for display, render the HTML, and send it to the client. 

On the client side, the JavaScript bundles would load, and the server-side HTML would be “hydrated,” meaning that all the browser event handlers that make the UI interactive are bound to the server-side HTML. If the page had many dynamic components that fetched data, the initial wait times could be excessive.

### Partial Renders with Server-side Rendering
With React 18,  <Suspense> can be used on the server to defer rendering to the client. Suspended components are always rendered on the client side, meaning that the syntax remains consistent, and there’s no server-side syntax needed for Suspense. The innovation in React 18 is that the server sends a partial render to the client, allowing the end user to see and interact with certain sections of the page immediately, while loaders appear while the client-side fetches and renders data. 

![How partial renders with server-side rendering works in React 18](https://cdn-blog.scalablepath.com/uploads/2023/03/server-side-rendering-pre-react-18-1.png)

The graphic above illustrates how a site header, sidebar, and some static content are quickly loaded and rendered on the server and sent to the client. The data-intensive section, wrapped in a <Suspense> component, is initially rendered on the server using its fallback prop (the spinner). The client then handles data fetching and final rendering.

As a result, end users can interact with the UI more immediately than was previously possible before React 18. The static portions of the page are already hydrated by the concurrent rendering engine, enabling users to click on links and even navigate away from the page, interrupting the render of the <Suspense> wrapped component. 

### Prioritized Hydration
Consider a more complex page with two sections that take longer to load because of a large number of interactive elements. For instance, a site header, sidebar, and two content components that are all hydrating. If the user wants to interact with the UI while it’s still loading, React 18’s concurrent rendering engine will prioritize the hydration of the component the user clicks on. This means that the component tree becomes more interactive sooner than other components.


![Prioritized Hydration with React 18âs concurrent rendering engine.](https://cdn-blog.scalablepath.com/uploads/2023/03/prioritized-hydration-react-18-1.png)

The concurrent rendering engine handles this selective hydration of components internally by, allowing for a more seamless user experience. By clicking on a specific region of the page, the hydration process is interrupted and rescheduled, ensuring a faster load time and a more quickly interactive UI. As a developer, you don’t have to worry about how this happens as long as you are using the new hydration API.

React’s combination of SSR with the <Suspense> component and the new interruptible hydration feature on the client-side offers clear advantages that greatly enhance the user experience and contribute to the overall positive impression users have when interacting with your web page. Additionally, these benefits come with the added bonus of maintaining good SEO, making it a “win-win” situation. 

## Automatic Batching and Transitions in React 18
React 18’s <Suspense> component changes provide a significant improvement in the end user’s interaction with your app. However, React 18 also introduces other changes that are designed to further speed up rendering and interactivity in your pages, such as automatic batching and transitions. These optimizations focus on state management on the client side and can improve the performance of all interactive components. Transitions, in particular, leverage the interruptible concurrent rendering engine extensively.

## Automatic Batching for Improved Performance 
Automatic batching in React 18 improves the performance of component state management by grouping all relevant state changes in a single re-render. For example, consider the following example of a counter that also displays if the counted number is even or odd:
```js
import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";


function AutoBatchedComponent() {
 const [autoBatching, setAutoBatching] = useState(true);
 const [count, setCount] = useState(0);
 const [isEven, setIsEven] = useState(false);


 function handleClick() {
   setCount((c) => c + 1); // Does not trigger a re-render yet
   setIsEven((count + 1) % 2 === 0); // Does not trigger a re-render yet
   // React will now do one render for 2 state changes
 }
 function handleClickWithFlush() {
   // will force a render
   flushSync(() => {
     setCount((c) => c + 1);
   });
   // will cause another render
   setIsEven((count + 1) % 2 === 0);
 }
 useEffect(() => {
   console.log("rendering auto-batched component");
 });


 return (
   <div>
     <p>
       AutoBatching is {autoBatching ? "ON" : "OFF"}{" "}
       <button onClick={() =>  
         setAutoBatching(!autoBatching)}>toggle</button>{" "}
     </p>
     <button onClick={autoBatching ? handleClick : handleClickWithFlush}>
       +1
     </button>
     <p className="even-odd">
       {count} is {isEven ? "even" : "odd"}
     </p>
   </div>
 );
}
export default AutoBatchedComponent;
```
The effect’s callback in the given example will print “rendering auto-batched component” in the console each time it renders the component. By default, React 18 uses automatic batching to group state updates and re-render the component only once, as seen in the example where two state updates produce only one line printed in the console.

However, there may be scenarios where you need to re-render the component with every state change, as was the behavior in React 17. In such cases, you can use flushSync() to opt out of automatic batching. It’s worth noting that this behavior is not recommended, and it is only intended as a temporary solution until developers can rewrite their components to work with automatic batching.

In the above example, we use flushSync()to simulate React 17. We switch between two click handlers, one that uses automatic batching to update state variables, and one that uses flushSync() to force a re-render after each state change. As a result, in the latter case, two lines are printed in the console with each click on the “+1” button. You can check out the full code for this example here.

### Using Transitions to Prioritize UI Changes 
Transitions in React offer a new way to prioritize UI changes. With transitions, you can distinguish between urgent and non-urgent updates to the UI. This differentiation allows you to prioritize the more critical updates over less urgent ones.


![A Table of How to use Transitions on React to prioritize UI updates.](https://cdn-blog.scalablepath.com/uploads/2023/03/react-transitions-ui-updates-priority-1-1.png)

To take advantage of transitions, you need to use the new hook useTransition(). 

In the example code below, the useTransition() hook returns an array with two values: a boolean variable named isPending, which is set to true when a transition is taking place, and a function named startTransition, which initiates the transition by calling a callback function.

`const [isPending, startTransition] = useTransition();`

The code placed within the callback will be executed at a lower priority than state changes made outside of the startTransition function. This means that state changes not wrapped within the startTransition will have higher priority, while the state changes made within the callback will occur in the background. 

The resulting concurrent render created with startTransitionis cancellable. If the user further makes changes that affect the validity of the render, that render will be interrupted and discarded. The overall effect of transitions is a more responsive UI.

It’s essential to understand the use case for state changes when using startTransition callback. This feature is primarily intended for transitioning from one render to another in React 18. The callback function must be a synchronous function; otherwise, it won’t work correctly. 

Here’s an example to help illustrate how to use the startTransition() callback function:
```js
import React, { useState, useTransition } from "react";
import TabButton from "./TabButton";
import Grid from "./Grid";


const Transition = () => {
 const [isPending, startTransition] = useTransition();
 const [selected, setSelected] = useState(10);
 const [count, setCount] = useState(10);
 const clickTab = (amount) => {
   setSelected(amount);
   startTransition(() => setCount(amount));
 };


 return (
   <div>
     <h3>click on the buttons to display larger and larger grids.</h3>
     <p>
       When you click on the button to select the grid size, the button's state
       changes immediately, but the grid may take a very long time to render.
     </p>
     <p>
       Click on the 500 x 500 button then on the 10 x 10 to cancel that render
     </p>
     <div className="tabs">
       <TabButton
         isActive={selected === 10}
         onClick={() => {
           clickTab(10);
         }}
       >
         10 by 10
       </TabButton>
       <TabButton
         isActive={selected === 100}
         onClick={() => {
           clickTab(100);
         }}
       >
         100 by 100 (slower)
       </TabButton>
       <TabButton
         isActive={selected === 500}
         onClick={() => {
           clickTab(500);
         }}
       >
         500 by 500 (slowest)
       </TabButton>
       <div className="rendering">{isPending ? " rendering..." : ""}</div>
     </div>
     <Grid count={count} />
   </div>
 );
};
export default Transition;
```

This example demonstrates the use of two states: one to handle the display of the highlighted tab button, and the other wrapped within a startTransition callback to specify the number of rows and columns to render in the <Grid> component.

When a user clicks on the “100 x 100” or “500 x 500” buttons, a “rendering” message appears if the isPending constant is true. This indicates that a render is taking place in the background and will only appear if the render takes a long time.

While the button highlight change is immediate, the rendering of the Grid will take place later. If the user selects the “500 x 500” button, it may take a long time to render. However, if they select the “10 x 10” button while waiting, the long render will be canceled. This highlights how the feature works within React 18’s interruptible/cancelable concurrent rendering engine.

## New Hooks in React 18
React 18 introduces several new hooks that aim to improve the performance and robustness of React applications. In addition to the useTransition hook, which we’ve already discussed in detail, there are a few others that are worth exploring.

### useId
The useId hook generates unique IDs that are stable across the server and client sides. It’s designed to be used with components that require unique IDs, such as UI testing sequences that mimic user actions. However, it’s not recommended to create unique keys for rendering collections. More information on the useID hook can be found here.

### useDeferredValue
The useDeferred hook has a similar function to useTransition and is commonly used for debouncing. Unlike traditional debouncing code, which is based on a specific amount of time, React updates the value as soon as the other queued-up work is completed. For more information on this hook, you can refer to this page.

### React.StrictMode
<React.StrictMode> is a development tool that helps developers test the robustness of their components as they transition to a future where mounting and unmounting will work with reusable state. This is a feature only available in development mode.

React simulates the unmounting and remounting of components so that when the reusable state becomes available, you can be confident that your components will function correctly. You can find more information about StrictMode in React 18 here.

## How to Upgrade to React 18
The release of React 18 brings about numerous changes to the core API for both server-side rendering and client-side application code. However, this article has only covered some of the more prominent features. If you’re interested in upgrading to React 18, the React Blog provides comprehensive information on the subject, including an Upgrade Guide.

## Final Thoughts
React 18 represents a significant milestone for the library, with a fundamental shift in how it operates. While this shift may seem daunting, many of the updates are optimizations that occur automatically, without requiring code changes. 

But this is just the beginning. The React team is planning to release a new version of the <Offscreen> component, which will allow developers to prepare UI screens in the background and keep the current state of the component when it is unmounted and remounted. Additionally, Server Components are currently under development, which will combine the features of <Suspense> with server-side capabilities.

As developers, we can look forward to the many new features that React and third-party libraries will introduce in the coming years. Although some of the changes may seem challenging to understand at first, we can trust the vision that the React team has for the future. 
If you’re wondering whether you should upgrade to React 18, my answer would be a resounding yes. This isn’t just a major release, but a game-changer and the React team has done a lot of work to make the transition as smooth as possible. By upgrading now, you can take advantage of the new features that the React team is working on for the future.

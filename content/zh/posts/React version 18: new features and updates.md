---
title: "React 18：深入了解新特性和更新"
date: 2023-11-15T14:53:15+08:00
image: /post/react18.webp
tags:
  - React18
draft: false
---
>React 在过去十年中取得了长足的进步，经历了重大变革，使其成为当今使用最广泛的前端 UI 框架之一。

最初，React 冗长的语法给开发人员带来了挑战。然而，React 引入了 JSX 语法，简化了组件的创建。接下来，带有 Hook 的功能组件使处理状态和生命周期函数变得更加容易，从而产生更优雅、可读和可维护的代码。随着 React 16 中服务器端渲染 (SSR) 的引入，通过允许更快的初始页面加载时间和更好的搜索引擎优化 (SEO) 来提高性能。 Next.js 和 Remix 等全栈框架使 React 变得更加易于使用，进一步提高了它的受欢迎程度。


该库的最新版本 React 18 于 2022 年 3 月发布。在本文中，我们将深入研究其新功能，并探讨为用户和开发人员带来的好处。我们还将研究如何实现这些新功能，并讨论 React 团队为该框架的未来制定的令人兴奋的计划。


## React 18 中的新功能和更新
React 17 是一个“垫脚石”版本，作为 React 18 中引入的新功能的关键准备。虽然 React 17 中的 React 开发者 API 没有进行任何更改，但它引入了增量升级版本的方法以及运行的能力单个组件树中存在多个版本的 React。这是实现 React 18 更新功能的重要一步。让我们深入研究其中的一些关键功能和更新。

![react18](/post/react18-features.png)

### 一个新的并发渲染引擎
React 18 引入了新的“并发渲染引擎”，该引擎针对前端和服务器端渲染进行了优化。这种向并发的转变简化了在服务器端和客户端呈现 UI 的过程。因此，用户可以更快地与页面交互，即使在以数据为中心的繁重页面上也能提供更流畅的体验。其中大部分是作为增强的“<Suspense>”组件的一部分实现的。
### 服务器端 `<Suspense>` 组件
服务器端“<Suspense>”组件的使用已经过优化，以方便部分服务器端渲染和水合作用。这意味着只有应用程序的“较轻”部分会在服务器上呈现并发送到客户端，从而允许立即重新加载页面。在客户端，`<Suspense>`已经集成了异步数据获取，可以完成页面较重部分的数据获取和渲染。最终结果是减少等待时间并为用户提供更流畅的体验。

### 响应更快的用户界面
新的可中断渲染引擎可以根据用户与 UI 的交互来重新确定服务器端组件水合作用的优先级。用户可以在 HTML 通过浏览器事件激活之前与页面进行交互。根据用户点击的位置，React 会优先考虑组件树的该部分，从而产生更快捷、响应更灵敏的 UI。

### 选择加入升级过程
React 18 的一个主要功能是其选择加入的升级过程。默认情况下，React 18 使用 React 17 渲染引擎。 React 团队通过在 API 中引入新的核心功能，同时仍然保持对旧功能的支持来实现这一目标。为了利用 React 18 中的新功能，开发人员必须专门使用新的 API 函数。这种方法使开发人员能够以最小的麻烦来测试他们的组件并进行升级，即使涉及到重大更改。
## React 18 中的并发渲染
据 React 博客介绍，React 18 的渲染引擎被设计为无缝的，使开发人员能够专注于他们的应用程序代码，而不必担心渲染过程。

在大多数情况下，更改是在渲染引擎本身内进行的，不会影响代码，第三方库维护人员可能除外。

React 中以前的渲染引擎作为单个、不间断的同步进程运行，渲染整个组件树。这意味着开发人员必须等到渲染完成才能看到任何新的更改。此类更改被安排到稍后的渲染队列中。

相比之下，React 18 中的渲染引擎已更新为可中断、可恢复，并且能够丢弃和替换其生成的 DOM。此更新使渲染过程更加灵活和高效。

值得注意的是，React 保证了一致的渲染。实际上，这意味着如果您使用 React 而不使用需要同步的外部存储，React 将使用其并发功能处理渲染并保证一致的渲染。如果您主要使用 useState 钩子编写纯 React，则可以期望更少的等待时间并获得一致的结果。

主要需要注意的是，代码库的维护者以不同的方式处理数据获取或状态管理，需要重写代码以防止不一致。考虑到这一点，React 团队选择加入 React 18，允许开发人员在完全采用新版本之前测试和升级组件。

现在，让我们看一下大多数 React 开发人员可能会使用的新功能。

## 客户端 React 的 <Suspense> 组件
<Suspense> 组件在 React 16.6 中引入，但范围有限。它仅适用于 React.Lazy，它允许组件在等待特定包加载时暂停。然而，它最初不能用于数据获取。这个限制已在最新版本的 React 中得到解决，使得可以使用 <Suspense> 组件来获取数据。

本质上，<Suspense>组件简化了异步数据获取过程和加载显示。它可以包裹在处理数据获取的组件周围，使开发人员能够在布局中显示以声明方式编码的加载器组件。

下面是之前将加载器逻辑合并到组件中以显示加载代码的方法的示例：
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
我们的应用程序代码将如下所示：
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
在这个例子中，加载器的逻辑是隐藏的，在更高层（即App组件）上不可见。 AsyncComponent 在内部处理加载器的显示逻辑。

下面是使用 <Suspense> 组件重写的相同 App.js：
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
现在我们可以看到加载逻辑已从异步组件中删除，这提供了几个好处。

首先，加载逻辑现在独立于数据获取组件。这意味着我们可以更改应用程序显示加载顺序的设计，而无需修改各个组件的代码。

其次，我们可以将 <Suspense> 组件嵌套在一起，从而允许我们显示整个部分的加载程序以及带有加载程序的子组件。

最后，数据获取组件的可挂起版本现在更加干净且易于维护：
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
请注意，此处显示的可挂起组件实现的示例被视为“临时”实现，React 团队不推荐。如果您有兴趣了解我如何实现数据获取（在这篇博文的帮助下）。

相反，React 团队建议使用已经将数据获取逻辑与 Suspense 集成的框架，这样您就不必自己实现它。以下是与 React 18 兼容的数据获取框架和库的部分列表，包括 Next.js、Gatsby、Relay 和 Apollo。

最后，<Suspense>最令人兴奋的功能是它支持使用相同语法的服务器端渲染，使得开发优化数据丰富页面的组件变得更加容易。我们来看看SSR如何与<Suspense>配合使用。

## 使用 <Suspense> 进行服务器端渲染
服务器端渲染是在 React 16 中引入的，主要用于 Next.js 等大型框架。使用 SSR 的主要优点之一是改善 SEO，因为仅限客户端的 React 应用程序没有可供网络爬虫读取的 HTML。

SSR 的另一个用例是通过立即发送 HTML 来更快地显示应用程序的入口点。但是，此方法最适合大多数静态的页面，以提供良好的用户体验。当SSR页面需要包含大量动态数据时，用户体验并不是最佳的。

### React 18 之前的服务器端渲染
在 Reat 18 之前，必须先完成下图所示的整个 SSR 流程，然后最终用户才能与页面进行交互。
![React 18 之前服务器端渲染 (SSR) 如何工作的图表](https://cdn-blog.scalablepath.com/uploads/2023/03/server-side-rendering-pre-react-18.png ）


服务器端渲染进程将获取显示所需的数据、渲染 HTML，并将其发送到客户端。

在客户端，JavaScript 包将加载，服务器端 HTML 将被“水合”，这意味着所有使 UI 交互的浏览器事件处理程序都绑定到服务器端 HTML。如果页面有许多获取数据的动态组件，则初始等待时间可能会过长。
### 使用服务器端渲染进行部分渲染
在 React 18 中，可以在服务器上使用 <Suspense> 来推迟向客户端的渲染。挂起的组件始终在客户端呈现，这意味着语法保持一致，并且 Suspense 不需要服务器端语法。 React 18 的创新之处在于，服务器向客户端发送部分渲染，允许最终用户立即查看页面的某些部分并与之交互，而加载器则在客户端获取和渲染数据时出现。

![React 18 中服务器端渲染的部分渲染如何工作](https://cdn-blog.scalablepath.com/uploads/2023/03/server-side-rendering-pre-react-18-1.png)

上图说明了如何在服务器上快速加载和呈现站点标题、侧边栏和一些静态内容，然后将其发送到客户端。数据密集型部分包含在 <Suspense> 组件中，最初使用其后备属性（微调器）在服务器上呈现。然后客户端处理数据获取和最终渲染。

因此，最终用户可以比 React 18 之前更立即地与 UI 进行交互。页面的静态部分已经由并发渲染引擎进行了水合，使用户能够单击链接，甚至导航离开页面，中断 <Suspense> 包装组件的渲染。
### 优先补水
考虑一个更复杂的页面，其中有两个部分，由于存在大量交互元素，加载时间较长。例如，网站标题、侧边栏和两个内容组件都是水合的。如果用户想在 UI 仍在加载时与其进行交互，React 18 的并发渲染引擎将优先考虑用户点击的组件的水合作用。这意味着组件树比其他组件更快地变得更具交互性。


![React 18 并发渲染引擎的优先水化。](https://cdn-blog.scalablepath.com/uploads/2023/03/prioritized-Hydration-react-18-1.png)
并发渲染引擎在内部处理组件的这种自定义水合使用，从而提供更无缝的用户体验。通过单击页面的特定区域，水合过程会被中断并重新安排，从而保证更快的加载时间和更快速的交互 UI。作为开发人员，只要使用新的 Hydration API，您就不必担心这是如何发生的。
React 将 SSR 与 <Suspense> 组件以及客户端新的可中断水合作用功能相结合，提供了明显的优势，可以极大地增强用户体验，并有助于用户在与网页交互时获得整体积极的印象。此外，这些好处还伴随着保持良好搜索引擎优化的额外好处，使其成为“双赢”的局面。

## React 18 中的自动批处理和转换
React 18 的 <Suspense> 组件更改显着改进了最终用户与应用程序的交互。但是，React 18 还引入了其他更改，旨在进一步加快页面中的渲染和交互性，例如自动批处理和转换。这些优化侧重于客户端的状态管理，可以提高所有交互组件的性能。尤其是过渡，广泛利用了可中断并发渲染引擎。

## 自动批处理以提高性能
React 18 中的自动批处理通过将所有相关状态更改分组到单个重新渲染中来提高组件状态管理的性能。例如，考虑以下计数器示例，该计数器还显示计数的数字是偶数还是奇数：
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
给定示例中效果的回调将在每次渲染组件时在控制台中打印“渲染自动批处理组件”。默认情况下，React 18 使用自动批处理对状态更新进行分组并仅重新渲染组件一次，如示例所示，两次状态更新仅在控制台中打印一行。

但是，在某些情况下，您可能需要在每次状态更改时重新渲染组件，就像 React 17 中的行为一样。在这种情况下，您可以使用flushSync() 来选择退出自动批处理。值得注意的是，不推荐这种行为，它只是作为临时解决方案，直到开发人员可以重写其组件以使用自动批处理。

在上面的示例中，我们使用flushSync()来模拟React 17。我们在两个点击处理程序之间切换，一个使用自动批处理来更新状态变量，另一个使用flushSync()在每次状态更改后强制重新渲染。因此，在后一种情况下，每次单击“+1”按钮都会在控制台中打印两行。您可以在此处查看此示例的完整代码。

### 使用转换来确定 UI 更改的优先级
React 中的转换提供了一种确定 UI 更改优先级的新方法。通过转换，您可以区分 UI 的紧急更新和非紧急更新。这种差异使您能够优先处理更重要的更新，而不是不太紧急的更新。


![如何在 React 上使用 Transitions 来确定 UI 更新优先级的表格。](https://cdn-blog.scalablepath.com/uploads/2023/03/react-transitions-ui-updates-priority-1-1。 .png）

要利用转换，您需要使用新的钩子 useTransition()。

在下面的示例代码中，useTransition() 挂钩返回一个具有两个值的数组：一个名为 isPending 的布尔变量，当发生转换时该变量设置为 true；以及一个名为 startTransition 的函数，该函数通过调用回调来启动转换功能。

`const [isPending, startTransition] = useTransition();`

放置在回调中的代码的执行优先级将低于 startTransition 函数外部进行的状态更改。这意味着未包含在 startTransition 中的状态更改将具有更高的优先级，而回调中进行的状态更改将在后台发生。

使用 startTransition 创建的并发渲染结果是可以取消的。如果用户进一步进行影响渲染有效性的更改，则该渲染将被中断并丢弃。过渡的总体效果是 UI 响应更加灵敏。

使用 startTransition 回调时，了解状态更改的用例至关重要。此功能主要用于在 React 18 中从一个渲染过渡到另一个渲染。回调函数必须是同步函数；否则，它将无法正常工作。

下面是一个示例来帮助说明如何使用 startTransition() 回调函数：
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
此示例演示了两种状态的使用：一种用于处理突出显示的选项卡按钮的显示，另一种包含在 startTransition 回调中以指定要在 <Grid> 组件中呈现的行数和列数。

当用户单击“100 x 100”或“500 x 500”按钮时，如果 isPending 常量为 true，则会出现“正在渲染”消息。这表示渲染正在后台进行，并且仅在渲染需要很长时间时才会出现。

虽然按钮突出显示会立即更改，但网格的渲染将在稍后进行。如果用户选择“500 x 500”按钮，则可能需要很长时间来渲染。但是，如果他们在等待时选择“10 x 10”按钮，则长时间渲染将被取消。这突出了该功能如何在 React 18 的可中断/可取消并发渲染引擎中工作。

## React 18 中的新 Hooks
React 18 引入了几个新的钩子，旨在提高 React 应用程序的性能和健壮性。除了我们已经详细讨论过的 useTransition 钩子之外，还有其他一些值得探索的钩子。

### useId
useId 挂钩生成在服务器端和客户端都稳定的唯一 ID。它设计用于需要唯一 ID 的组件，例如模仿用户操作的 UI 测试序列。但是，不建议为渲染集合创建唯一的键。有关 useID 挂钩的更多信息可以在此处找到。

### useDeferredValue
useDeferred 钩子具有与 useTransition 类似的功能，通常用于去抖动。与基于特定时间量的传统去抖代码不同，React 会在其他排队工作完成后立即更新该值。有关此钩子的更多信息，您可以参考此页面。

### React.StrictMode
<React.StrictMode> 是一种开发工具，可帮助开发人员在过渡到安装和卸载将在可重用状态下工作的未来时测试其组件的稳健性。这是仅在开发模式下可用的功能。

React 模拟组件的卸载和重新安装，以便当可重用状态可用时，您可以确信您的组件将正常运行。您可以在此处找到有关 React 18 中 StrictMode 的更多信息。

## 如何升级到 React 18
React 18 的发布给服务器端渲染和客户端应用程序代码的核心 API 带来了许多变化。然而，本文仅介绍了一些更突出的功能。如果您有兴趣升级到 React 18，React 博客提供了有关该主题的全面信息，包括升级指南。

## 最后的想法
React 18 代表了该库的一个重要里程碑，它的运作方式发生了根本性的转变。虽然这种转变可能看起来令人畏惧，但许多更新都是自动发生的优化，无需更改代码。

但这仅仅是开始。 React 团队计划发布新版本的 <Offscreen> 组件，该组件将允许开发人员在后台准备 UI 屏幕，并在卸载和重新安装时保持组件的当前状态。此外，服务器组件目前正在开发中，它将把 <Suspense> 的功能与服务器端功能结合起来。

作为开发人员，我们可以期待 React 和第三方库在未来几年推出的许多新功能。尽管有些变化乍一看似乎难以理解，但我们可以相信 React 团队对未来的愿景。
如果您想知道是否应该升级到 React 18，我的回答是肯定的。这不仅仅是一个主要版本，而且是一个游戏规则改变者，React 团队做了很多工作来使过渡尽可能顺利。通过现在升级，您可以利用 React 团队未来正在开发的新功能。

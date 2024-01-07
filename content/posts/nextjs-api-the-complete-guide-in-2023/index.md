---
title: "Nextjs基础介绍（新手参考）"
date: 2023-12-18T12:15:58+08:00
draft: false
image: banner.png
summary: 
---

## 渲染
**预渲染**：

默认情况下，Next.js 预渲染每个页面。 预渲染可以带来更好的性能。

`Nextjs` 同时支持一种或多种渲染模式：

在 **服务器端渲染 (SSR)** 模式下，页面 HTML 是在每次请求时生成的。

在**静态站点生成 (SSG)** 模式下，页面 HTML 是在构建时生成的。

在 **客户端渲染 (CSR)** 模式下，页面 HTML 由 javascript 在客户端生成。

## 路由
### Link：

在客户端进行路由转换。
```javascript
import Link from 'next/link';

<Link href="/about">A link</Link>

<Link href={{
    pathname: '/blog/[slug]',
    query: { slug: 'post-one'},
}}>A link</Link>

```
### useRouter 和 withRouter
`useRouter` 是一个在函数组件内部使用的钩子。
```javascript
import { useRouter } from 'next/router';

const router = useRouter();
router.push('url')
```


`useRouter` 返回的对象是 `router` 对象，它包含一些您可能想要检索的属性。

`withRouter` 是一个可以在函数组件和类组件内部使用的钩子，它将把 `router` 对象传递给你的包装组件。
````js
import { withRouter } from 'next/router'

class MyComponent extends React.Component<MyComponentProps> {
  render() {
    return <button onClick={()=>{
        this.props.router.push('a new url')
    }}>click</button>
  }
}
 
export default withRouter(MyComponent)
````


### router
它有很多我们可以使用的有用的属性和方法。

pathname: `String`</br>
query: `Object`</br>
asPath: `String`</br>
isFallback: `boolean`</br>
basePath: `String`</br>
locale: `String` </br>
locales: `String[]`</br>
defaultLocale: `String` </br>
domainLocales: `Array<{domain, defaultLocale, locales}>`</br>
isReady: `boolean`</br>
isPreview: `boolean`</br>

#### router.push
处理客户端转换，将新的 URL 条目添加到历史堆栈中。

```javascript
router.push(url, as, options)
```

url: `UrlObject | String`<br/>
as: `UrlObject | String`<br/>
options: `{scroll:boolean,shallow:boolean,locale:string}`.

#### router.replace
防止将新的 URL 条目添加到历史堆栈中，而是替换。

用法就像`router.push`方法一样。

#### router.prefetch
预取页面以实现**更快**的客户端转换，用于无需下一个/链接的导航，因为下一个/链接会自动处理预取页面。

```javascript
router.prefetch(url, as, options)
```

#### router.back
返回上一个路由。 与`window.history.back()`相同。

```javascript
router.back()
```
#### router.reload
重新加载当前 URL
```javascript
路由器.reload()
```
#### router.beforePopState
监听popstate 并在导航操作之前做一些事情。
```javascript
router.beforePopState(({url,as,选项}) => {
     //在导航操作之前做一些事情
})
```

#### router.events.on
监听组件内的不同事件。
```javascript
  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? 'with' : 'without'
        } shallow routing`
      )
    }
 
    router.events.on('routeChangeStart', handleRouteChange)
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])
```
事件类型：
- `routeChangeStart(url, {shallow })` - 当路线开始改变时触发
- `routeChangeComplete(url, {shallow })` - 当路线完全改变时触发
- `routeChangeError(err, url, {shallow })` - 更改路由时出错或取消路由加载时触发
- `beforeHistoryChange(url, {shallow })` - 在更改浏览器历史记录之前触发
- `hashChangeStart(url, {shallow })` - 当哈希发生变化但页面不变时触发
- `hashChangeComplete(url, {shallow })` - 当哈希值已更改但页面未更改时触发

### 数据获取

#### 获取静态属性
可用于静态站点生成，它将在构建时运行
#### 获取静态路径
如果页面具有“动态路由”并使用“getStaticProps”，则需要定义要静态生成的路径列表。
#### 获取ServerSideProps
getServerSideProps 是一个 Next.js 函数，可用于在请求时获取数据并呈现页面内容。

#### 客户端获取

您可以使用多种方式在客户端获取数据，这取决于您。

- with `useEffect`
```javascript
useEffect(() => {
fetch('/api/profile-data')
    .then((res) => res.json())
    .then((data) => {
    setData(data)
    setLoading(false)
    })
}, [])
```

- with `swr`
```javascript
import useSWR from 'swr'
 
const fetcher = (...args) => fetch(...args).then((res) => res.json())
 
function Profile() {
  const { data, error } = useSWR('/api/profile-data', fetcher)
 
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
 
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}
```
## 样式

### CSS 模块

您所能做的就是在与组件相同的路径下创建一个`.module.css`扩展文件。

```javascript
//button.module.css
.error {
  color: white;
  background-color: red;
}

//button.js
import styles from './button.module.css'
<button className={styles.error}>
Click Me
</button>
```

### Tailwind CSS
Tailwind CSS 是一个实用程序优先的 CSS 框架，与 Next.js 配合得非常好。
### Sass

```javascript
//next.config.js
const path = require('path')
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

```
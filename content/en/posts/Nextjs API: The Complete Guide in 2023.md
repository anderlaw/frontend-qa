---
title: "Nextjs API: The Complete Guide in 2023(for Pages Router)"
date: 2023-12-18T12:15:58+08:00
draft: false
image: https://www.freecodecamp.org/news/content/images/size/w2000/2020/10/nextjs-featured-image--1-.png
---


## Rendering
**pre-renders**:

By default, Next.js pre-renders every page. Pre-rendering can result in better performance.

`Nextjs` Supports one or several rendering modes at the same time:

In **Server-side Rendering (SSR)**<br/> mode,the page HTML is generated on each request.

In **Static Site Generation (SSG)**<br/> mode,the page HTML is generated at build time.

In **Client-side Rendering (CSR)**<br/> mode,the page HTML is generated at client side by javascript.

## routing
### Link:

Do route transitions on clientside.

```javascript
import Link from 'next/link';

<Link href="/about">A link</Link>

<Link href={{
    pathname: '/blog/[slug]',
    query: { slug: 'post-one'},
}}>A link</Link>

```

### useRouter & withRouter
`useRouter` is a hook used inside function component.
```javascript
import { useRouter } from 'next/router';

const router = useRouter();
router.push('url')
```
the object returned by `useRouter` is `router` object, it contains some attributes that you may want to retrieve.

`withRouter` is a hook can be used inside both fucntion component and class component,it will pass the `router` object to your wrapped component.
```js
import { withRouter } from 'next/router'

class MyComponent extends React.Component<MyComponentProps> {
  render() {
    return <button onClick={()=>{
        this.props.router.push('a new url')
    }}>click</button>
  }
}
 
export default withRouter(MyComponent)
```


### router
it has a lot of useful attributes and methods that we can use.

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
Handles client-side transitions,adding a new URL entry into the history stack.
```javascript
router.push(url, as, options)
```
url: `UrlObject | String`<br/>
as: `UrlObject | String`<br/>
options: `{scroll:boolean,shallow:boolean,locale:string}`

#### router.replace
prevent adding a new URL entry into the history stack, replace instead.

usage just like `router.push`method.

#### router.prefetch
Prefetch pages for **faster** client-side transitions, for navigations without next/link, as next/link takes care of prefetching pages automatically.

```javascript
router.prefetch(url, as, options)
```
#### router.back
Navigate back in history. the same way as `window.history.back()`
```javascript
router.back()
```
#### router.reload
Reload the current URL
```javascript
router.reload()
```
#### router.beforePopState
listen to popstate and do something before the navigate action.
```javascript
router.beforePopState(({url,as,options}) => {
    //do something before the navigate action
})
```


#### router.events.on
listen to different events inside your compoent.
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
types of events:
- `routeChangeStart(url, { shallow })` - Fires when a route starts to change
- `routeChangeComplete(url, { shallow })` - Fires when a route changed completely
- `routeChangeError(err, url, { shallow })` - Fires when there's an error when changing routes, or a route load is cancelled
- `beforeHistoryChange(url, { shallow })` - Fires before changing the browser's history
- `hashChangeStart(url, { shallow })` - Fires when the hash will change but not the page
- `hashChangeComplete(url, { shallow })` - Fires when the hash has changed but not the page

### data fetching

#### getStaticProps
can be used for Static Site Generation,which will run at build time
#### getStaticPaths
If a page has `Dynamic Routes` and uses `getStaticProps`, it needs to define a list of paths to be statically generated.
#### getServerSideProps
getServerSideProps is a Next.js function that can be used fetch data and render the contents of a page at request time.

#### Client-side Fetching

you can use many ways to fetch data on the client side, which depends on you.
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
## Styling

### CSS Modules

all you can do is to create a `.module.css` extension file at the same path as your component.

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
Tailwind CSS is a utility-first CSS framework that works exceptionally well with Next.js.
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
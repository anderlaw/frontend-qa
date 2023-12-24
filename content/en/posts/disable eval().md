---
title: "How to disable eval() in your website"
date: 2023-12-24T10:56:15+08:00
draft: false
image: https://miro.medium.com/v2/resize:fit:1118/format:webp/1*_F2klxMtOaoQbFs1Bn8xng.png
---
As we all know that `eval()` is a powerful function in JavaScript, it can run javascript code from literal strings,but for some unsafe reasons we do not recommended to use `eval()`. There are many different ways to disable `eval` in your application,such as overwrites `eval global object` to another function, or use eslint to check the usage of it in your development environment.

Today i will disable `eval()` by implementing `CSP`(content security policy).


## what is `CSP`

Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks. 

you can enable `CSP` either on your serverside or frontend side.

on server side you need to configure your web server to return the `Content-Security-Policy` HTTP header.

on frontend side you need to configure a `mata` element:
```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'" />
```
the `CSP` above restricts the resources available only come from the site's origin.


you can declare multiple statments separated by semicolons. other statments you can see on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)


## How does it relate to `eval()`

`CSP` restricts the origins of all resources available, including a string of javascript code of course, so when you restrict the `CSP` policy, you disable the string to be executed with `eval()` at the same time.

when you configure the `CSP` policy, your browser will throw an error and ignore it if `eval()` has been called:
eval-error.png

![eval error](/post/eval-error.png)


## One more thing

Don't forget to put the `script` **behind** the *CSP* statement or use `async` property.
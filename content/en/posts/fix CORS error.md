---
title: "How to fix CORS error \"No 'Access-Control-Allow-Origin' header is present on the requested resource\"？"
date: 2023-11-16T09:00:40+08:00
image: /post/no-access-control-allow-origin.png
draft: false
---

There are several online apps available nowadays. The majority of systems now offer some form of online user interface. These interfaces deal with the client-side presentation or how to display it to the user. The user can interact with the web apps and request information or updates from the server. The data gets saved in a database that the server may access. The client-side web application requests information from the web server, which the server responds with by retrieving it from the database. Because the data or information may be sensitive, a security safeguard must be in place to ensure its integrity. CORS, or Cross-Origin Resource Sharing, is a security procedure to provide this data‘s integrity.

We shall study what CORS is and how it works in general in this article. We will learn what preflight requests are and how CORS relies on them. Furthermore, we’ll go through how we can use CORS and solve the issues that arise from it in our apps.

## What is the same-origin policy?
In internet security, the same-origin policy restricts the interaction of a document or script loaded from one origin with a resource loaded from another origin.

## What is CORS?
CORS stands for Cross-Origin Resource Sharing. When one domain requests resources from another, it is called a cross-domain request. Due to security concerns, we may only want a few domains (other than our own) to have access to the server’s resources. That is where CORS comes in. The CORS technique allows a server to specify resources it will load from other origins (domains, schemes, or ports) other than HTTP headers.

Prior to CORS, there was no ability to call an API endpoint in a separate domain for security concerns. The Same-Origin Policy prevents this.

## Why do we need CORS?
This method stops hackers from installing malicious scripts on different websites. For instance, a hacker may call example.com through AJAX and make modifications on behalf of the signed-in user.

Cross-origin access is also beneficial or even required in some other genuine circumstances, though. For instance, if our React web application calls an API backend set up on a separate domain. It won’t be possible without CORS.


## How does CORS work?
CORS enables the server to explicitly allow specific sources, allowing it to override the same-origin restriction. If we set up our CORS server, each response will include an additional header with the key “Access-Control-Allow-Origin.”


## What are simple requests?
A simple request is one that does not begin a preflight request before sending the actual request. A simple request fits all of the following requirements:

The request uses one of the permitted methods, such as GET, HEAD, or POST.
Aside from the user-agent generated headers, the only headers that may be manually set are,
Accept
Accept-Language
Content-Language
Content-Type
The Content-Type header can only include one of the following values:
application/x-www-form-urlencoded
multipart/form-data
text/plain
There is no event listener associated with XMLHttpRequest.upload.
The request makes no use of a ReadableStream object.


## What is a preflight request?
A CORS preflight request examines the server’s ability to employ particular methods and headers and the server’s knowledge of the CORS protocol.

Browsers automatically generate preflight requests. Therefore, front-end developers often don’t need to write them.

Using the “Access-Control-Max-Age” header, it is possible to selectively cache the preflight responses for requests made at the same URL. The browser employs a unique cache for preflight responses distinct from the browser’s standard HTTP cache.


## Credentialed requests
CORS is also capable of making “credentialed” requests. In these requests, the server and client can communicate via cookies (which may hold essential credentials).

CORS does not contain cookies on cross-origin requests by default. Including cookies in the cross-origin request can result in a vulnerability known as cross-site request forgery, or CSRF. CORS needs both the server and the client to confirm that it is okay to include cookies on requests in order to decrease the possibility of CSRF vulnerabilities.


## The HTTP response headers used in CORS
We explained how CORS works by including additional headers with the response indicating whether the origin is on the server’s allowlist. Let’s have a look at some of the headers that CORS employs for this reason.

### Access-Control-Allow-Origin
The Access-Control-Allow-Origin header defines an origin and instructs browsers to permit that origin to access server resources for requests without credentials. It may also include a wildcard `*`, which instructs the browser that any origin can access the server’s resources for requests without credentials.
```
Access-Control-Allow-Origin: *
```
However, we cannot use a wildcard in the Access-Control-Allow-Origin header for requests containing credentials or cookies in general. Only one origin should be provided in this situation.
```
Access-Control-Allow-Origin: www.example.com
```
### Access-Control-Max-Age
The browser can store a preflight request for a given length of time using the Access-Control-Max-Age header.
```
Access-Control-Max-Age: 1800
```
### Access-Control-Allow-Methods
It is used in response to a preflight request to specify the method or methods that are allowed to access the resource.
```
Access-Control-Allow-Methods: GET, POST, PUT
```

### Access-Control-Allow-Headers
As part of a preflight request, the Access-Control-Allow-Headers header specifies which HTTP headers the client can use during the actual request.
```
Access-Control-Allow-Headers: Content-Type
```
## How to fix the CORS errors



You may have encountered the CORS error “no ‘access-control-allow-origin’ header is present on the requested site” when constructing a web application. It occurs because no headers are sent to the browser in the preflight request informing the browser if the origin is permitted to access the resource.

There are several solutions to this problem.
### fix on backend side(nodejs)
To address the CORS problem, we may manually add the necessary headers to each request. We will use middleware to set these headers whenever our server receives a request for resources. Create a middleware using the code below to set the needed headers to address the CORS error.
```js
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})
```
Here we have set the origin to *. It means for simple requests like GET, HEAD, or POST; the server allows all the origins to access the server’s resources.

There might be a problem if the client’s browser sends a preflight request. The origin should not be a wildcard or * for handling preflight requests. Therefore, we can update the code a little to address preflight requests.
```js
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://example.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})
```
Code language: JavaScript (javascript)
As an alternative to middleware, we may use the app.options method over a specific endpoint to listen for preflight requests. The preflight request is an OPTIONS request (rather than a GET, POST, or PUT).
```js
app.options("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://example.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});
```

Additionally, you can use the `cors` NPM package.

install that package:
```bash
npm install cors
```

use that package in your app:
```js
const cors = require("cors");

app.use(cors({
  origin: 'https://example.com'
}));
```

### fix on frontend side

If you don’t control the server your frontend code is sending a request to, and the problem with the response from that server is just the lack of the necessary Access-Control-Allow-Origin header, and you are using framework like `React`,`Vue`,`Angular` etc, you can easily get things to work—by making the request through a CORS proxy plugin.

here is the vue Cli for proxy settting:
```js
module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '^/foo': {
        target: '<other_url>'
      }
    }
  }
}
```


## Conclusion
This article taught us what CORS is and how it generally works. Furthermore, we looked at what preflight requests are and how CORS relies on them. Finally, we learned how to use CORS and solve the issues arising from it in our apps.

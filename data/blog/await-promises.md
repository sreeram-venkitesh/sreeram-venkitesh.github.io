---
title: "Learning how await waits only for promises, the hard way"
summary: ""
tags: ["react"]
draft: false 
date: "2022-04-9"
---

I had wasted some time over an interesting error a few days back while working with `await` and `promises` in Javascript. Here’s the code that I had written.

```js
if (needToRefresh){
  ...
  accessTokenRefreshResponse = await accessTokenApi.refresh();
  ...
} else {
  // code for generating access token with email and password
}
```

And in the API helper file

```js
const refresh = () => {
  axios.post(`${api_url}/api/refresh`, refreshPayload);
};
```

Try taking a moment to see if you can find out what I did wrong here

---

I was getting await has no effect on this type of expression warning with the await inside the if. The request was being sent, but the next line after the await did not wait for it to get finished.

The reason was that I had added curly braces in the refresh function, essentially making it not return anything. We can only `await` expressions that return a promise. I should’ve either added a `return` keyword in my refresh function, or removed the curly braces, like so

```js
const refresh = () => axios.post(`${api_url}/api/refresh`, refreshPayload);
```

I wasted some time trying to debug why my code was not working, but I'm glad I was able to fill a gap in my mental models and add a new tool in my debugging arsenal, to inspect code the next time something goes wrong (Checking if a function is actually returning what we want, or if we've messed up our curly braces and ended up not returning anything)
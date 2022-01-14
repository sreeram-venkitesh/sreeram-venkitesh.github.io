---
title: "Notes on CSS Preprocessing, Tailwind and React"
summary: "Understand what we are actually doing when setting up Tailwind in your React project"
tags: ["css","react","tailwindcss","software engineering"]
draft: false 
date: "2021-09-22"
---

The process of installing TailwindCSS in your project can vary slightly depending on what you are working on, whether it be a standalone React app, using React with Ruby on Rails, or if you are using something entirely different such as Next.js or Gatsby.

In this article, we will see how we can add TailwindCSS to a barebones React project created with [create-react-app](https://github.com/facebook/create-react-app). The aim of this practice is to learn more about CSS preprocessors, tools like PostCSS and to shed some light on how these tools helps us to write CSS code in more efficient and readable manner.

Before we dive into the specifics of working on a React project, let us look into some of these terms in more detail.

---

## Table of Contents

### 1. [CSS Preprocessors](#css-preprocessors)

### 2. [PostCSS](#postcss)

### 3. [TailwindCSS as a PostCSS plugin](#tailwindcss-as-a-postcss-plugin)
 
---

### CSS Preprocessors

CSS preprocessors are programs that lets us create CSS code by writing code in the preprocessor's own syntax. Why would we want to use a preprocessor than writing our own CSS code then? It is because these preprocessors can add new syntax that is not available in regular CSS, which can make writing and maintaining code much easier for us. Let's see an example for this. 

Take a look at how we usually do nested styles in css. Here we are defining styles for the `ul`, `li`, and `a` elements which comes inside the `nav` element.

```css
/* styles.css */
nav ul {
 margin: 0;
 padding: 0;
}

nav li {
 display: inline-block;
}

nav a {
 display: block;
 color: #333;
}
```

Now let us see how we can write if we are using a CSS preprocessor. Here we are using [Sass](https://sass-lang.com/) to write our styles. We can see that it comes with special syntax for nesting which makes the code instantly easier to read.

```scss
// styles.scss
nav {
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    display: inline-block; 
  }

  a {
    display: block;
    color: #333; 
  }
}
```

Once we have written all the CSS rules we need, we can easily compile the Sass code to generate CSS files for our website with a simple command.

```bash
npx sass styles.scss output.css
```

This generates `output.css` which contains the same code that we had written in the earlier file, following all the CSS rules. This is just one example of what a CSS preprocessor can do. Once you start using preprocessors for writing CSS and start thinking in terms of their syntax you will understand why they are a thing!

---

### PostCSS

PostCSS is a tool for transforming CSS files using **JS plugins**. These plugins are functions written in JavaScript that can be used to process your CSS code however you want. For example, you may write a PostCSS plugin that takes in a CSS file and converts all the colors into a specific format, say `rgb`.

There are a lot of PostCSS plugins for different purposes, like linting your code, adding mixins, install vendor prefixes for compatibility with different browsers etc. Contrary to what the name might suggest, PostCSS can also be used to preprocess our CSS code. This can be done by making use of the multitude of plugins that people have created, to process our CSS code however we want. Just add the necessary PostCSS plugins and compile it along with your build script.

```bash
postcss in.css -o out.css  
```

We can even argue that using PostCSS is better than using other CSS preprocessors, because here we have a fine control of what all processing we want to do to our CSS. We can add only those plugins which we truly need. When using a standard preprocessor like Sass or Less, we don't get to exclude certain features we might not like and we will have to write our code around the preprocessor. PostCSS removes all such headaches.

**[Autoprefixer](https://www.npmjs.com/package/autoprefixer)** is one of the most popular PostCSS plugins. Run your CSS code through the autoprefixer plugin and it automatically adds all the different vendor prefixes that you need to add to your CSS code to make it compatible with all the different browsers! Using plugins like autoprefixer using PostCSS makes writing CSS code sane, and your code will be more efficient and readable. 

<aside>
👨🏻‍💻 If you are still confused about PostCSS, just think of it as a program that takes CSS files as inputs, and processes them using different functions (written in the form of plugins) and outputs new processed CSS code. We can write these plugin functions to automate many stuff, like the above mentioned adding of vendor prefixes, making our entire development process much easier.

</aside>

---

### TailwindCSS as a PostCSS plugin

The [Tailwind documentation](https://tailwindcss.com/docs/installation#installing-tailwind-css-as-a-post-css-plugin) recommends that we install Tailwind in our project as a PostCSS plugin. This means that we will be importing Tailwind's `base`, `components`, and `utilities` styles in a CSS file like so...

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

...and use PostCSS to compile this into a regular CSS file, that we can import in our projects.

```bash
postcss src/styles/tailwind.css -o src/styles/styles.css
```

That's the gist of using TailwindCSS in a React project. Makes sense, right? Let us see how you can add Tailwind to your fresh React project in a step by step manner now.

1. Install `tailwind` and `postcss` in your project with
    
    `yarn add tailwindcss postcss autoprefixer`
    
2. Add TailwindCSS as a PostCSS plugin in your `postcss.config.js` file
    
    ```jsx
    const tailwindcss = require('tailwindcss');
    module.exports = {
        plugins: [
            tailwindcss('./tailwind.config.js'),
            require('autoprefixer')
        ],
    };
    ```
    
3. Create a `tailwind.config.js` to customise your Tailwind installation.
    
    ```jsx
    // tailwind.config.js
    module.exports = {
      purge: [],
      darkMode: false, // or 'media' or 'class'
      theme: {
        extend: {},
      },
      variants: {},
      plugins: [],
    }
    ```
    
    This is where you can add custom colors, etc.
    
4. Create `src/styles/tailwind.css` and `src/styles/styles.css`. We will be importing all the Tailwind stuff in the `tailwind.css` file and use PostCSS to process that into a `styles.css` file before building, and import that style.css in our project
    
    ```css
    /* src/styles/tailwind.css */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
    
5. Build your css by adding a command to the script that starts your dev server in `package.json`
    
    ```json
    "scripts": {
    		"start": "yarn run watch:css && react-scripts start",
    		"build": "yarn run watch:css && react-scripts build",
    		"test": "react-scripts test",
    		"eject": "react-scripts eject",
    		"watch:css": "postcss src/styles/tailwind.css -o src/styles/styles.css"
    },
    ```
    

1. Once we run `yarn start`, PostCSS will generate a `styles.css` file based on our config given in `tailwind.css` and `tailwind.config.js`. Take a look at this `styles.css` once generated, it will contain all the prefixes required for support in all the different browsers like IE, Chrome, Firefox, Opera etc. This is done automatically, thanks to the autoprefixer plugin that we are using!
- Now you can import `styles.css` in your `index.js` where you render your React components.
- If you have followed all the above steps correctly, the following code should the render the `h1` element with styles from the respective Tailwind classes
    
    ```jsx
    import React from "react";
    import ReactDOM from "react-dom";
    import './styles/styles.css'
    
    const App = () => {
      return (
        <h1 className="h-screen bg-blue-900 text-white">Hello World!</h1>
      )
    }
    
    ReactDOM.render(<App/>,document.getElementById("root"))
    ```

Congratulations! You have successfully added Tailwind CSS to your React project!
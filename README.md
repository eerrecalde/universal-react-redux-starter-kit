# React Redux Starter Kit

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This starter kit is basically a clone of clones with some extra features. See below the story line to understand why:

1- davezuko created this great and robust starter kit (with the help of many other devs): https://github.com/davezuko/react-redux-starter-kit
which is basically a complete starter kit version using Redux ReactJs

2- janoist1 cloned it, and made it universal by adding server side rendering support, and helmet between others. https://github.com/janoist1/universal-react-redux-starter-kit

3- Lastly I cloned it from janoist1 and removed some stuff I believe (this is questionable) are too complex for a normal project + added more features.

My changes below:
- Simplified or trying to simplify "over wired" stuff (variable assigned with variables depending on other variables)
- Removed index.js files from folders in favour of a more descriptive file name and removing extra folders.
- Added api support and implementation with hard coded data in a way that a real api could be easily implemented.
- Removed tests files from 'test' folder in favour of local test in the component folder.
- Added mocha.
- Added more components which uses the api.
- Moved all config files into config folder.
- Added actions, reducers (for redux)
- Removed routes folder (which was including logic + layout + styles) and added a routes.js file with all the routes logic and moved the rest to components.

1. [Features](#features)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Application Structure](#application-structure)
1. [Development](#development)
  1. [Developer Tools](#developer-tools)
  1. [Routing](#routing)
1. [Testing](#testing)
1. [Deployment](#deployment)
1. [Build System](#build-system)
  1. [Configuration](#configuration)
  1. [Root Resolve](#root-resolve)
  1. [Globals](#globals)
  1. [Styles](#styles)
  1. [Server](#server)
  1. [Production Optimization](#production-optimization)
1. [Learning Resources](#learning-resources)
1. [FAQ](#troubleshooting)
1. [Thank You](#thank-you)

## Features
* [react](https://github.com/facebook/react)
* [redux](https://github.com/rackt/redux)
* [react-router](https://github.com/rackt/react-router)
* [react-router-redux](https://github.com/rackt/react-router-redux)
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [koa](https://github.com/koajs/koa)
* [karma](https://github.com/karma-runner/karma)
* [eslint](http://eslint.org)
* [universal](http://redux.js.org/docs/recipes/ServerRendering.html)

## Requirements
* node `^4.2.0`
* npm `^3.0.0`

## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), you can create a new project based on `react-redux-starter-kit` in one of two ways:

### Install from source

First, clone or download:

```bash
$ git clone git@github.com:eerrecalde/universal-react-redux-starter-kit.git
```

Then, rename to your project name and get into the directory:

```bash
$ mv react-redux-starter-kit <my-project-name>
$ cd <my-project-name>
```

### Alternatively, install via `redux-cli`

If not already installed (globally):

```bash
$ npm i redux-cli -g
```

Then, create a new project:

```bash
$ redux new <my-project-name>
$ cd <my-project-name>
```

### Install dependencies, and check to see it works

```bash
$ npm install                   # Install project dependencies
$ npm start                     # Compile and launch
```
If everything works, you should see the url and port to browse
<img src="http://i.imgur.com/zR7VRG6.png?2" />

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`start:dev`|Same as `start` but overrides `NODE_ENV` to "development".|
|`start:prod`|Serves your app at `localhost:3000`. Production environment.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`dev:no-debug`|Same as `npm run dev` but disables devtool instrumentation.|
|`test`|Runs unit tests with Karma|
|`test:dev`|Runs Karma and watches for changes to re-run tests.|
|`build`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`build:dev`|Same as `build` but overrides `NODE_ENV` to "development".|
|`build:prod`|Same as `build` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

## Application Structure

The application structure presented in this boilerplate is grouped primarily by feature rather than file type. Please note, however, that this structure is only meant to serve as a guide, it is by no means prescriptive.

```
.
├── build                    # All build-related configuration
│   └── webpack              # Environment-specific configuration files for webpack
├── config                   # Project configuration settings
├── server                   # Koa application (uses webpack middleware)
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── main.js              # Application bootstrap and rendering
│   ├── components           # Reusable Presentational Components
│   ├── containers           # Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   ├── redux                # "Ducks" location...
│   │   └── modules          # reducer, action, creators not part of a route
│   ├── routes               # Main route definitions and async split points
│   ├── static               # Static assets (not imported anywhere in source code)
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
.
```

## Development

#### Developer Tools

**We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn’t require installing any packages.

However, adding the DevTools components to your project is simple. First, grab the packages from npm:

```bash
npm i --save-dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor
```

Then follow the [manual integration walkthrough](https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md).

#### `redux-cli`

```bash
npm install redux-cli --save-dev
```

### Routing
We use `react-router` [route definitions](https://github.com/reactjs/react-router/blob/master/docs/API.md#plainroute) (`<route>/index.js`) to define units of logic within our application. See the [application structure](#application-structure) section for more information.

## Testing
To add a unit test, simply create a `.test.js` file anywhere your src folder. Karma will pick up on these files automatically, and Mocha and Chai will be available within your test without the need to import them. If you are using `redux-cli`, test files should automatically be generated when you create a component or redux module.

## Deployment
Out of the box, this starter kit is deployable by serving the `~/dist` folder generated by `npm run deploy` (make sure to specify your target `NODE_ENV` as well). This project does not concern itself with the details of server-side rendering or API structure, since that demands an opinionated structure that makes it difficult to extend the starter kit. However, if you do need help with more advanced deployment strategies, here are a few tips:

### Static Deployments
If you are serving the application via a web server such as nginx, make sure to direct incoming routes to the root `~/dist/index.html` file and let react-router take care of the rest. If you are unsure of how to do this, you might find [this documentation](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#configuring-your-server) helpful. The Koa server that comes with the starter kit is able to be extended to serve as an API or whatever else you need, but that's entirely up to you.

### Heroku

Heroku has `nodejs buildpack` script that does the following when you deploy your app to Heroku.
1. Find `packages.json` in the root directory.
2. Install `nodejs` and `npm` packages.
3. Run `npm postinstall script`
4. Run `npm start`

Therefore, you need to modify `package.json` before deploying to Heroku. Make the following changes in the `scripts` section of `package.json`.

```
...
"start": "better-npm-run start:prod",
"serve": "better-npm-run start",
"postinstall": "npm run deploy:prod",
"betterScripts": {
  ...
  "start:prod": {
    "command": "babel-node bin/server",
    "env": {
      "NODE_ENV": "production"
    }
  }
  ...
},
```

It's also important to tell Heroku to install all `devDependencies` to successfully compile your app on Heroku's environment. Run the following in your terminal.

```bash
$ heroku config:set NPM_CONFIG_PRODUCTION=false
```

With this setup, you will install all the necessray packages, build your app, and start the webserver (e.g. koa) everytime you push your app to Heroku. Try to deploy to Heroku by running the following commands.

```bash
$ git add .
$ git commit -m 'My awesome commit'
$ git push heroku master
```

If you fail to deploy for an unknown reason, try [this helpful comment](https://github.com/davezuko/react-redux-starter-kit/issues/730#issuecomment-213997120) by [DonHansDampf](https://github.com/DonHansDampf) addressing Heroku deployments.

Have more questions? Feel free to submit an issue or join the Gitter chat!

## Build System

### Configuration

Default project configuration can be found in `~/config/index.js`. Here you'll be able to redefine your `src` and `dist` directories, adjust compilation settings, tweak your vendor dependencies, and more. For the most part, you should be able to make changes in here **without ever having to touch the actual webpack build configuration**.

If you need environment-specific overrides (useful for dynamically setting API endpoints, for example), you can edit `~/config/environments.js` and define overrides on a per-NODE_ENV basis. There are examples for both `development` and `production`, so use those as guidelines. Here are some common configuration options:

|Key|Description|
|---|-----------|
|`dir_src`|application source code base path|
|`dir_dist`|path to build compiled application to|
|`server_host`|hostname for the Koa server|
|`server_port`|port for the Koa server|
|`compiler_css_modules`|whether or not to enable CSS modules|
|`compiler_devtool`|what type of source-maps to generate (set to `false`/`null` to disable)|
|`compiler_vendor`|packages to separate into to the vendor bundle|


### Root Resolve
Webpack is configured to make use of [resolve.root](http://webpack.github.io/docs/configuration.html#resolve-root), which lets you import local packages as if you were traversing from the root of your `~/src` directory. Here's an example:

```js
// current file: ~/src/views/some/nested/View.js
// What used to be this:
import SomeComponent from '../../../components/SomeComponent'

// Can now be this:
import SomeComponent from 'components/SomeComponent' // Hooray!
```

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/index.js`. When adding new globals, make sure you also add them to `~/.eslintrc`.

|Variable|Description|
|---|---|
|`process.env.NODE_ENV`|the active `NODE_ENV` when the build started|
|`__DEV__`|True when `process.env.NODE_ENV` is `development`|
|`__PROD__`|True when `process.env.NODE_ENV` is `production`|
|`__TEST__`|True when `process.env.NODE_ENV` is `test`|
|`__DEBUG__`|True when `process.env.NODE_ENV` is `development` and cli arg `--no_debug` is not set (`npm run dev:no-debug`)|
|`__BASENAME__`|[history basename option](https://github.com/rackt/history/blob/master/docs/BasenameSupport.md)|

### Styles

Both `.scss` and `.css` file extensions are supported out of the box and are configured to use [CSS Modules](https://github.com/css-modules/css-modules). After being imported, styles will be processed with [PostCSS](https://github.com/postcss/postcss) for minification and autoprefixing, and will be extracted to a `.css` file during production builds.

### Server

This starter kit comes packaged with an Koa server. It's important to note that the sole purpose of this server is to provide `webpack-dev-middleware` and `webpack-hot-middleware` for hot module replacement. Using a custom Koa app in place of [webpack-dev-server](https://github.com/webpack/webpack-dev-server) makes it easier to extend the starter kit to include functionality such as API's, universal rendering, and more -- all without bloating the base boilerplate.

### Production Optimization

Babel is configured to use [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) so transforms aren't inlined. Additionally, in production, we use [react-optimize](https://github.com/thejameskyle/babel-react-optimize) to further optimize your React code.

In production, webpack will extract styles to a `.css` file, minify your JavaScript, and perform additional optimizations such as module deduplication.

### Universal / Server rendering

This starter kit supports universal rendering by setting the configuration key `universal.enabled` to `true`. It compiles the project using the configuration from `build/webpack.config.server.js` then uses it as a Koa middleware.

## Learning Resources

* [Starting out with react-redux-starter-kit](https://suspicious.website/2016/04/29/starting-out-with-react-redux-starter-kit/) is an introduction to the components used in this starter kit with a small example in the end.

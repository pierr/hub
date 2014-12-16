hub
===

Application hub.

## Structure

- The main component's code is inside the `lib` directory and it has its own structure.
The build entry point is the `index.js` file.
- There is a hub example in the `example` directory and it can be serve by a node task `npm run serve`.
- The `dist` directory is made in order to publish a hub.js file for the production.

## Config

In the lib/config.js file you can see all the configuration you are able to override. It is mainly for developemlent purpose except for the api parameter.

## hub.js

The hub.js publish a `Hub` object inside the `window` object.
It has to be instanciated as follows: `new Hub()`.
You can define the url of the api to load the data as follows: 
```javascript
new Hub({
  "api": {
    "url": "http://localhost:7777/user",
    "method": "GET",
    "criteria": {}
  }});
```

## Install

`git clone https://github.com/pierr/hub.git`
In the hub directory, do the following actions:
- Install node modules: `npm install`

## Build
 
Launch the following command: `npm run build` or `gulp`

## Serve an example with a watcher

Launch the following command : `npm run serve` or 'gulp serve', this should launch your default browser on the port 3000, and reload the page when you make a change in the `lib` directory (it also relaunch the build).


## API

There is a mock api package with the component in order to test the hub.
In order to launch it you have to do: `npm run api`, il will be launched on `localhost:7777`and publish two routes:
- user : load the user informations
- unauthorized: load the UNAUTHORIZED request


see https://www.npmjs.org/package/gulp-define-module
hub
===

Application hub.

## Structure

- The main component's code is inside the `lib` directory and it has its own structure.
The build entry point is the `index.js` file.
- There is a hub example in the `example` directory and it can be serve by a node task `npm run serve`.
- The `dist` directory is made in order to publish a hub.js file for the production.

## hub.js

The hub.js publish a `Hub` object inside the `window` object.
It has to be instanciated as follows: `new Hub()`

## Install

`git clone https://github.com/pierr/hub.git`
In the hub directory, do the following actions:
- Install node modules: `npm install`

## Build
 
Launch the following command: `npm run build`

## Serve an example with a watcher

Launch the following command : `npm run serve`, this should launch your default browser on the port 3000, and reload the page when you make a change in the `lib` directory (it also relaunch the build).

see https://www.npmjs.org/package/gulp-define-module
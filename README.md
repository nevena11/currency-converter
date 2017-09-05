# Currency Converter 1.0

## Description

This web application is presenting a simple currency exchange calculator that will retrieve the fresh exchange rates from 3rd party API service each day.

It is also responsive and come with couple of interesting features like caching mechanism, state saver, responsiveness and so on.

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: I have use Node to run a development web server and build the project.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json). This command will also run post install script that will build project for development environment:

    npm install

Also the [Webpack][] is used as main build system.

The last step is to run development web server from Webpack via command below that will open system default browser and serve project index page.

## Build

In order to build project there are two commands available in [package.json](package.json). First below will build entire project with development profile and place all bundles in 'dist' folder:

    npm run build

Second command will build project for production environment and minify / unify bundles as much as possible.

    npm run build:prod

## Application workflow

Since the application is based on Angular 4 2 components, entire workflow is done by them.

First there is a main component that is bootstrapped during main Angular module initialization and that is retrieving data necessary for converter to work.

That is done in a way that the simple logic is implemented in cache service for checking should application get the data from proxy URL or id data is valid inside of browser cache, use them.

Next retrieved data are then send to child components that are representing 2 same widgets with currency chooser and input fields for currency value. These components are then communicating with parent (main) component by sending data back and forward.

Main component is utilizing those state data to calculate proper exchange value and send it back to child components for displaying.

In short this is the basic logic how currency converter is functioning in this application.


## Used resources and technologies
For purpose of this project I have opt out for Angular 4 based application and structure. Everything was written from scratch, like entire webpack configuration, project structure, Angular structure, styles, implemented code and so on. Nothing was copied from various starter packs and Angular-cli haven't been used here at all.

Short list of some resources are below (visible in [package.json](package.json)):

	- Webpack 3
	- Angular 4
	- TypeScript 2.5
	- Moment 2
	- ESLint 4
	- Style lint
	- TS lint
	- Bourbon SASS mixins
	- ES6 shim for IE
	- RXJS 5
	- Pug template engine
	- SVG2PNG library for generating images from SVG files
	- And various others modules and plugins

[Node.js]: https://nodejs.org/
[Webpack]: https://webpack.js.org/

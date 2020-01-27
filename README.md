# Webpack 4 Boilerplate

A basic webpack 4 boilerplate.

## Requirements
[node.js](https://nodejs.org/)

## Setup
1. Clone this repository.
2. Install the dependencies.

  ```sh
  $ npm install
  ```

## Using webpack-dev-server
1. Start the local webpack-dev-server.

```sh
$ npm run serve
```

2. Navigate to [http://localhost:3000](http://localhost:3000).

## Building
When building, your code will be bundled and outputed to `/dist`.

### Building for development
```sh
$ npm run build
```

### Building for production
```sh
$ npm run build:prod
```

## Features
* [Babel](https://github.com/babel/babel)
* [Sass](https://github.com/sass/sass)
* [Autoprefixer](https://github.com/postcss/autoprefixer)
* File loading via [file-loader](https://github.com/webpack-contrib/file-loader)
* Webpack dev server via [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* Minification of HTML, CSS, JavaScript and SVG
* [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)
# mtg-node-api

This is a web api built on top of node.js and [mtgjson](https://github.com/Sembiance/mtgjson) (huge thanks to @Sembiance for keeping that shiz up to date). All of the source and tests are [written in es6](https://github.com/lukehoban/es6features). If you're daunted by setting up your environment for es6, don't be: the dev instructions are dead simple.

See **[the routes](https://github.com/brandonaaskov/mtg-node-api/blob/master/src/index.js)** for some hints at what to play with.

## Development
- [Install nvm (if you don't already have it)](https://github.com/creationix/nvm#install-script)
- `nvm install`
- `npm install`
- `npm start`

(server now running at http://localhost:3000)

### Tests
`npm test`

### ES5-ify
If you'd like es5 versions of the source, run `gulp build` and it will output all of the same code, passed through [babel](https://babeljs.io/), and dump it into the `/build` folder.

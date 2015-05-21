# mtg-node-api

This is a web api built on top of node.js and [mtgjson](https://github.com/Sembiance/mtgjson) (huge thanks to @Sembiance for keeping that shiz up to date). All of the source and tests are [written in es6](https://github.com/lukehoban/es6features). If you can't run es6 natively for whatever reason (you can easily with `nvm`, I `Promise`), then you can run `gulp` and it will es5-ify each file and poop it out into the `build/` directory.

See **[the routes](https://github.com/brandonaaskov/mtg-node-api/blob/master/src/index.js)** for some hints at what to play with.

# mtg-node-api

This is a web api built on top of node.js and [mtgjson](https://github.com/Sembiance/mtgjson) (huge thanks to @Sembiance for keeping that shiz up to date). All of the source and tests are [written in es6](https://github.com/lukehoban/es6features). If you can't run es6 natively for whatever reason (you can easily with `nvm`, I `Promise`), then you can run `gulp` and it will es5-ify each file and poop it out into the `build/` directory.

## Features
*(informal list for now)*
- [ ] Paging
- [ ] Get cards by cost range
- [ ] add _.compact() to json responder
- [ ] check out how to leverage Map + Set + WeakMap + WeakSet

## Routes
These are currently still being defined and are under development

### For Cards
- [x] /cards/name/:name
- [x] /cards/color/:color
- [x] /cards/monocolor/:color
- [ ] /cards/cost/:cost
- [ ] /cards/mechanic/:mechanic
- [ ] /cards/type/:type
- [x] /cards/rarity/:rarity
- [ ] /cards/block/:block

### For Sets
- [x] /releases/names/
- [x] /releases/name/:name
- [x] /releases/block/:block
- [ ] /releases/after-release-date/

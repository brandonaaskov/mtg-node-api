# mtg-node-api

This is a web api built on top of node.js and [mtgjson](https://github.com/Sembiance/mtgjson) (huge thanks to @Sembiance for keeping that shiz up to date). All of the source and tests are [written in es6](https://github.com/lukehoban/es6features). If you can't run es6 natively for whatever reason (you can easily with `nvm`, I `Promise`), then you can run `gulp` and it will es5-ify each file and poop it out into the `build/` directory.

## Routes
These are currently still being defined and are under development
### For Cards
- [ ] /card/name/
- [ ] /card/color/
- [ ] /card/monocolor/
- [ ] /card/cost/
- [ ] /card/mechanic/
- [ ] /card/type/
- [ ] /card/rarity/

### For Sets
- [ ] /set/name/
- [ ] /set/format/
  - *find sets by format (e.g. standard, modern, legacy, etc.)*
- [ ] /set/release-date/

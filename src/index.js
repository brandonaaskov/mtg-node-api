import _ from 'lodash'
import underscoreString from 'underscore.string'
import express from 'express'
import Api from './Api'

_.mixin(underscoreString.exports())

let api = new Api()
let app = express()
let respond = (res, json) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(_.compact(json)))
}

app.get('/cards/name/:name', (req, res) => {
  var json = api.getCardsByName(req.params.name)
  respond(res, json)
})

app.get('/cards/color/:color', (req, res) => {
  var json = api.getCardsByColor(req.params.color)
  respond(res, json)
})

app.get('/cards/monocolor/:color', (req, res) => {
  var json = api.getCardsByMonoColor(req.params.color)
  respond(res, json)
})

app.get('/cards/rarity/:rarity', (req, res) => {
  var json = api.getCardsByRarity(req.params.rarity)
  respond(res, json)
})

app.get('/releases/names', (req, res) => {
  var json = api.releaseNames
  respond(res, json)
})

app.get('/releases/name/:name/', (req, res) => {
  var json = api.getReleaseByName(req.params.name)
  respond(res, json)
})

app.get('/releases/block/:block/', (req, res) => {
  var json = api.getReleasesByBlock(req.params.block)
  respond(res, json)
})

app.listen(3000)

export default app

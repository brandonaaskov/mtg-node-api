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


// -------------------------------- card-related routes
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

app.get('/cards/cmc/:cost', (req, res) => {
  var json = api.getCardsByCMC(req.params.cost)
  respond(res, json)
})

app.get('/cards/type/:type', (req, res) => {
  var json = api.getCardsByType(req.params.type)
  respond(res, json)
})

app.get('/cards/format/:format', (req, res) => {
  var json = api.getCardsByFormat(req.params.format)
  respond(res, json)
})

app.get('/cards/banned/:format', (req, res) => {
  var json = api.getBannedCardsByFormat(req.params.format)
  respond(res, json)
})
// --------------------------------


// -------------------------------- release-related routes
app.get('/releases/names', (req, res) => {
  var json = api.releaseNames
  respond(res, json)
})

app.get('/releases/name/:name/', (req, res) => {
  var json = api.getReleaseByName(req.params.name)
  respond(res, json)
})

app.get('/releases/format/:format/', (req, res) => {
  var json = api.getReleasesByFormat(req.params.format)
  respond(res, json)
})
// --------------------------------

app.listen(3000)

export default app

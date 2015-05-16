import _ from 'underscore'
import underscoreString from 'underscore.string'
import express from 'express'
import Api from './Api'

_.mixin(underscoreString.exports())

let api = new Api()
let app = express()

app.get('/', (req, res) => {
  var json = api.getRelease('Khans of Tarkir')
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(json))
})

app.listen(3000)

export default app

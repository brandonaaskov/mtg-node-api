import _ from 'lodash'
import underscoreString from 'underscore.string'
import express from 'express'
import Api from './Api'

_.mixin(underscoreString.exports())

let api = new Api()
let app = express()

app.get('/set/name/:name/', (req, res) => {
  var json = api.getRelease(req.params.name)
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(json))
})

app.listen(3000)

export default app

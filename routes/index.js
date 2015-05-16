var express = require('express')
var router = express.Router()
var api = require('../src/api')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  res.end(api.findCardsBySet('Khans of Tarkir'))
})

module.exports = router

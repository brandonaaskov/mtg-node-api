var sets = require('../lib/cards.json')
var _ = require('underscore')

//function addSetNameToCards (cards, setName) {
//  cards = _.map(cards, function (card) {
//    _.card()
//  })
//}

function addSetNameToCards (setName) {
  return _.extend(this, {set: setName})
}

function getSetNames () {
  return _.pluck(sets, 'name')
}

function findCardsBySet (setName) {
  var release = _.findWhere(sets, {name: setName})

  if (!release) {
    console.warn('no set found by name: ' + setName)
    return
  }

  _.invoke(release.cards, addSetNameToCards, setName)
  return release.cards
}

function findCardByName (cardName) {
  var versions = []

  _.each(sets, function (set) {
    var setName = set.name
    _.find(set.cards, function (card) {
      if (card.name.toLowerCase() === cardName.toLowerCase()) {
        versions.push(_.extend(card, {set: setName}))
      }
    })
  })

  return versions
}

function findCards (options) {
  var cards = []

  if (options.name) {
    cards = cards.concat(findCardByName(options.name))
  }

  return cards
}

//var test = findCardsBySet('Fate Reforged')
//_.each(test, function (card) {
//  if (card.text && card.text.toLowerCase().indexOf('bolster') !== -1) {
//    console.log('bolster', card.name)
//  }
//})

//console.log(getSetNames())
//console.log(test)

exports.findCardByName = findCardByName
exports.findCardsBySet = findCardsBySet
exports.findCards = findCards
exports.getReleases = getSetNames

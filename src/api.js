import _ from 'underscore'
import Card from './Card'
import CardSet from './CardSet'

import allSets from '../lib/cards.json'

//let allSets = null

class Api {
  //constructor () {
  //  console.log('allsets', allSets)
  //}

  get releaseNames () {
    return _.pluck(allSets, 'name')
  }

  returnError (options) {
    return {
      error: {
        message: options.message || '',
        method: options.method || ''
      }
    }
  }

  getRelease (releaseName) {
    var release = _.findWhere(allSets, {name: releaseName})

    if (!release) {
      var errorOptions = {
        message: 'no release found by name: ' + releaseName,
        method: 'getRelease'
      }

      return this.returnError(errorOptions)
    }

    var cardSet = new CardSet(release)
    return cardSet
  }
}

export default Api



//function findSet (releaseName) {
//  var release = _.findWhere(sets, {name: releaseName})
//
//  if (!release) {
//    console.warn('no set found by name: ' + releaseName)
//    return
//  }
//
//  var cardset = new Set(releaseName, release.cards)
//  return cardset
//}
//
//function findCardByName (cardName) {
//  var versions = []
//
//  _.each(sets, function (set) {
//    var releaseName = set.name
//    _.find(set.cards, function (card) {
//      if (card.name.toLowerCase() === cardName.toLowerCase()) {
//        versions.push(_.extend(card, {set: releaseName}))
//      }
//    })
//  })
//
//  return versions
//}
//
//function findCards (options) {
//  var cards = []
//
//  if (options.name) {
//    cards = cards.concat(findCardByName(options.name))
//  }
//
//  return cards
//}
//
//(function init () {
//  mtgjson(function (err, data) {
//    sets = data
//  })
//
//  _.mixin(require('underscore.string').exports)
//})()

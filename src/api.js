import _ from 'lodash'
import CardCollection from './collections/CardCollection'
import {underscored, titleize} from 'underscore.string'

import mtgjson from '../lib/cards.json'

let internal = Symbol()

class Api {
  constructor () {
    this.collections = _.map(mtgjson, (release) => {
      return new CardCollection(release)
    })
  }

  error (message) {
    return {
      error: {
        message: message
      }
    }
  }

  get releaseNames () {
    return _.pluck(this.collections, 'name')
  }

  getReleaseByName (releaseName) {
    var release = _.find(this.collections, (collection) => {
      if (underscored(collection.name) === underscored(releaseName)) return collection
    })

    if (!release) {
      return this.error('no release found by name: ' + releaseName)
    }

    return release
  }

  getCardsByName (cardName) {
    let cards = []

    _.each(this.collections, (collection) => {
      cards.push(collection.getCardByName(cardName))
    })

    if (_.isEmpty(cards)) {
      return this.error('no cards found by name: ' + cardName)
    }

    return cards
  }

  getCardsByColor (color, monocolor) {
    color = capitalize(color)
    let cards = []

    _.each(this.collections, (collection) => {
      _.each(collection.cards, (card) => {
        let colors = card.colors || []
        if (monocolor && colors.length > 1) {
          cards.push(card, collection)
        }
        else if(!monocolor && _.indexOf(colors, color) !== -1) {
          cards.push(card, collection)
        }
      })
    })

    return cards
  }

  getCardsByRarity (rarity) {
    let cards = []

    if (rarity.toLowerCase() === 'mythic') {
      // "mythic" is common, but it's stored as Mythic Rare in mtgjson
      rarity = 'Mythic Rare'
    }

    _.each(this.collections, (collection) => {
      let filtered = _.filter(collection.cards, {rarity: titleize(rarity)})
      cards = cards.concat(filtered)
    })

    return cards
  }

  getReleasesByBlock (block) {
    let releases = []

    _.each(this.collections, (collection) => {
      if (collection.isBlockLegal(block)) {
        releases.push(collection)
      }
    })

    return _.pluck(releases, 'name')
  }

  getCardsByFormat () {}
}

export default Api

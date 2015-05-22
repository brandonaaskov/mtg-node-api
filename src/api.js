import _ from 'lodash'
import CardCollection from './collections/CardCollection'
import {underscored, titleize} from 'underscore.string'
import mtgjson from '../lib/cards.json'

class Api {
  constructor () {
    let collections = _.map(mtgjson, (release) => {
      return new CardCollection(release)
    })

    this.collections = collections
  }

  // -------------------------------- internal stuff
  error (message) {
    return {
      error: {
        message: message
      }
    }
  }
  // --------------------------------


  // -------------------------------- getters/setters
  get releaseNames () {
    return _.pluck(this.collections, 'name')
  }

  get collections () {
    return this._collections
  }

  set collections (cardCollections) {
    this._collections = cardCollections
  }
  // --------------------------------


  // -------------------------------- release-related methods
  getReleaseByName (releaseName) {
    var release = _.find(this.collections, (collection) => {
      if (underscored(collection.name) === underscored(releaseName)) return collection
    })

    if (!release) {
      return this.error('no release found by name: ' + releaseName)
    }

    return release
  }

  getReleasesByFormat (block) {
    let releases = []

    _.each(this.collections, (collection) => {
      if (collection.isFormatLegal(block)) {
        releases.push(collection)
      }
    })

    return _.pluck(releases, 'name')
  }
  // --------------------------------


  // -------------------------------- card-related methods
  getCardsByName (cardName) {
    let cards = []

    _.each(this.collections, (collection) => {
      cards = cards.concat(collection.getCardsByName(cardName))
    })

    if (_.isEmpty(cards)) {
      return this.error('no cards found by name: ' + cardName)
    }

    return cards
  }

  getCardsByMonoColor (color) {
    return this.getCardsByColor(color, true)
  }

  getCardsByColor (color, monocolor) {
    color = titleize(color)
    let cards = []

    _.each(this.collections, (collection) => {
      cards = cards.concat(collection.getCardsByColor(color, monocolor))
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

  getCardsByCMC (cmc) {
    let cards = []

    _.each(this.collections, (collection) => {
      cards = cards.concat(collection.getCardsByCMC(cmc))
    })

    return cards
  }

  getCardsByType (type) {
    let cards = []

    _.each(this.collections, (collection) => {
      cards = cards.concat(collection.getCardsByType(type))
    })

    return cards
  }

  getBannedCardsByFormat (format) {
    let cards = []

    _.each(this.collections, (collection) => {
      cards = cards.concat(collection.getBannedCardsByFormat(format))
    })

    return cards
  }
  // --------------------------------
}

export default Api

import _ from 'lodash'
import Card from '../models/Card'
import {underscored, titleize} from 'underscore.string'

class CardCollection {
  constructor (cardSet) {
    // copies all properties over (for now...)
    for (var prop in cardSet) {
      this[prop] = cardSet[prop]
    }

    this.cards = _.map(cardSet.cards, (card) => {
      return new Card(card, cardSet.name)
    })
  }

  finalizeCards (cards) {
    let finalized = _.compact(cards)
    return finalized
  }

  getCardsByColor (color, monocolor) {
    let cards = []

    _.find(this.cards, (card) => {
      let colors = card.colors || []
      if (monocolor && colors.length === 1) {
        cards.push(card)
      }
      else if(!monocolor && _.indexOf(colors, color) !== -1) {
        cards.push(card)
      }
    })

    return this.finalizeCards(cards)
  }

  getCardsByName (cardName) {
    let cards = _.map(this.cards, (card) => {
      if (underscored(card.name) === underscored(cardName)) {
        return card
      }
    })

    return this.finalizeCards(cards)
  }

  getCardsByCMC (cmc) {
    let cards = _.filter(this.cards, {cmc: cmc})

    return this.finalizeCards(cards)
  }

  getCardsByType (type) {
    let cards = _.filter(this.cards, function (card) {
      if (!_.has(card, 'types') && !_.isEmpty(card.types)) {
        return this.false
      }

      if (_.indexOf(card.types, titleize(type)) !== -1) {
        return true
      }
    })

    return this.finalizeCards(cards)
  }

  getBannedCardsByFormat (format) {
    let cards = []

    _.find(this.cards, (card) => {
      if (_.has(card, 'legalities')) {
        let legality = _.get(card.legalities, titleize(format))
        if (legality && legality.toLowerCase() === 'banned') {
          cards.push(card)
        }
      }
    })

    return this.finalizeCards(cards)
  }

  isFormatLegal (format) {
    let cards = []
    let cardsInSet = this.cards.length

    _.find(this.cards, (card) => {
      if (_.has(card, 'legalities')) {
        let legality = _.get(card.legalities, titleize(format))
        if (legality && legality.toLowerCase() === 'legal') {
          cards.push(card)
        }
      }
    })

    return (cards.length === cardsInSet) ? true : false
  }
}

export default CardCollection

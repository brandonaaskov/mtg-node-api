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

    return cards
  }

  getCardsByName (cardName) {
    let cards = []

    _.find(this.cards, (card) => {
      if (underscored(card.name) === underscored(cardName)) {
        cards.push(card)
      }
    })

    return cards
  }

  getCardsByCMC (cmc) {
    return _.filter(this.cards, {cmc: cmc})
  }

  isBlockLegal (block) {
    let cards = []
    let cardsInSet = this.cards.length

    _.find(this.cards, (card) => {
      if (_.has(card, 'legalities')) {
        let isLegal = _.get(card.legalities, titleize(block))
        if (isLegal) {
          cards.push(card)
        }
      }
    })

    return (cards.length === cardsInSet) ? true : false
  }
}

export default CardCollection

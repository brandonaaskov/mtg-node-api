import _ from 'lodash'
import Card from './Card'

class CardSet {
  constructor (cardSet) {
    this.name = cardSet.name
    this.releaseDate = cardSet.releaseDate
    this.cards = cardSet.cards
    this.cards = _.map(cardSet.cards, (card) => new Card(card))

    _.invoke(cardSet, this.addSetNameToCards, this.name)
  }

  addSetNameToCards (setName) {
    return _.extend(this, {set: setName})
  }
}

export default CardSet

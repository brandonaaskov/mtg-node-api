import _ from 'underscore'

class Card {
  constructor (card) {

    // copies all properties over (for now...)
    for (var prop in card) {
      this[prop] = card[prop]
    }
  }
}

export default Card

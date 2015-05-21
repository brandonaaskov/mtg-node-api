import _ from 'lodash'

class Card {
  constructor (card, release) {
    if (!release) {
      throw new Error("You must provide the release object when creating a Card")
    }

    // copies all properties over (for now...)
    for (var prop in card) {
      this[prop] = card[prop]
    }

    this.releaseName = release.name

    delete this.originalType
    delete this.multiverseid
    delete this.layout
    delete this.foreignNames
    delete this.imageName
    delete this.originalText
    delete this.flavor
  }
}

export default Card

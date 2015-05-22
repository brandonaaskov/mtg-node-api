import _ from 'lodash'

class Card {
  constructor (card, releaseName) {
    if (!releaseName) {
      throw new Error("You must provide the release object when creating a Card")
    }

    // copies all properties over (for now...)
    for (var prop in card) {
      this[prop] = card[prop]
    }

    this.releaseName = releaseName

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

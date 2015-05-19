import _ from 'lodash'
import {underscored} from 'underscore.string'
import Card from './Card'
import CardSet from './CardSet'

import allSets from '../lib/cards.json'

let internal = Symbol()

class Api {
  constructor () {
    internal = {
      returnError: (options) => {
        return {
          error: {
            message: options.message || '',
            method: options.method || ''
          }
        }
      }
    }
  }

  get releaseNames () {
    return _.pluck(allSets, 'name')
  }

  getRelease (releaseName) {
    var release = _.find(allSets, (release) => {
      if (underscored(release.name) === underscored(releaseName)) return release
    })

    if (!release) {
      var errorOptions = {
        message: 'no release found by name: ' + releaseName,
        method: 'getRelease'
      }

      return internal.returnError(errorOptions)
    }

    var cardSet = new CardSet(release)
    return cardSet
  }
}

export default Api

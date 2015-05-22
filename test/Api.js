import _ from 'lodash'
import chai from 'chai'
import Api from '../src/Api'

let expect = chai.expect
let api = new Api()

describe('Api', () => {
  it('cannot call a private method', () => {
    expect(api).not.to.include.keys('returnError')
  })

  describe('Release (aka set) Related Methods', () => {
    it('gets all release names', () => {
      expect(api.releaseNames).not.to.be.empty
    })

    it('gets release by name', () => {
      let setName = 'Khans of Tarkir'
      let collection = api.getReleaseByName(setName)

      expect(collection.cards).not.to.be.empty
      expect(collection.name).to.equal(setName)

      setName = 'dragons of tarkir' //lowercased
      collection = api.getReleaseByName(setName)

      expect(collection).not.to.be.empty
      expect(collection.name).to.equal('Dragons of Tarkir')
    })

    it('returns an error for an invalid set name', () => {
      let json = api.getReleaseByName('bacon')
      expect(json).to.include.keys('error')
    })
    
    it('retrieves releases by block', () => {
      let json = api.getReleasesByBlock('standard')
      expect(json).to.not.be.empty
    })
  })

  describe('Card Related Methods', () => {
    describe('by rarity', () => {
      it('gets cards by rarity', () => {
        let json = api.getCardsByRarity('mythic')
        expect(json).not.to.be.empty
      })

      it('handles the mythic casing scenario', () => {
        let json = api.getCardsByRarity('mythic rare')
        expect(json).not.to.be.empty
      })
    })

    describe('by name', () => {
      it('gets cards by name', () => {
        let json = api.getCardsByName('abzan charm')
        expect(_.compact(json)).not.to.be.empty
      })

      it('adds the release name to all cards', () => {
        let json = api.getCardsByName('gravedigger')
        expect(_.compact(json)).not.to.be.empty

        let releaseNames = _.pluck(json, 'releaseName')
        expect(json.length).to.equal(releaseNames.length)
      })
    })

    describe('by color', () => {
      it('gets cards by color', () => {
        let json = api.getCardsByColor('black')
        expect(json).not.to.be.empty
      })

      it('gets cards by monocolor', () => {
        let json = api.getCardsByMonoColor('black')
        _.each(json, (card) => {
          expect(card.colors.length).to.equal(1)
        })
      })
    })
  })
})

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
    
    it('retrieves releases by format', () => {
      let releases = api.getReleasesByFormat('standard')
      expect(releases).to.not.be.above(5) //magic number, but whatever
    })
  })

  describe('Card Related Methods', () => {
    describe('by rarity', () => {
      it('gets cards by rarity', () => {
        let cards = api.getCardsByRarity('mythic')
        let names = _.compact(_.pluck(cards, 'name'))
        expect(cards.length).to.equal(names.length)
      })

      it('handles the mythic casing scenario', () => {
        let cards = api.getCardsByRarity('mythic rare')
        let names = _.compact(_.pluck(cards, 'name'))
        expect(cards.length).to.equal(names.length)
      })
    })

    describe('by name', () => {
      it('gets cards by name', () => {
        let cards = api.getCardsByName('raise the alarm')
        let names = _.pluck(cards, 'name')
        expect(cards.length).to.equal(names.length)
      })

      it('adds the release name to all cards', () => {
        let cards = api.getCardsByName('gravedigger')
        let names = _.pluck(cards, 'name')
        expect(cards.length).to.equal(names.length)

        let releaseNames = _.pluck(cards, 'releaseName')
        expect(cards.length).to.equal(releaseNames.length)
      })
    })

    describe('by color', () => {
      it('gets cards by color', () => {
        let cards = api.getCardsByColor('black')
        let names = _.compact(_.pluck(cards, 'name'))
        expect(cards.length).to.equal(names.length)
      })

      it('gets cards by monocolor', () => {
        let cards = api.getCardsByMonoColor('black')
        _.each(cards, (card) => {
          expect(card.colors.length).to.equal(1)
        })

        let names = _.compact(_.pluck(cards, 'name'))
        expect(cards.length).to.equal(names.length)
      })
    })

    describe('by cost', () => {
      it('gets cards by converted mana cost', function () {
        let cards = api.getCardsByCMC(7)
        let names = _.compact(_.pluck(cards, 'name'))
        expect(cards.length).to.equal(names.length)
      })
    })

    describe('by type', () => {
      var types = [
        'instant',
        'sorcery',
        'artifact',
        'creature',
        'enchantment',
        'land',
        'planeswalker'
      ]

      _.each(types, function (type) {
        it('gets '+ type +' cards', function () {
          let cards = api.getCardsByType(type)
          let names = _.compact(_.pluck(cards, 'name'))
          expect(cards.length).to.equal(names.length)
        })
      })
    })

    describe('gets banned cards:', () => {
      it('by format', function () {
        let cards = api.getBannedCardsByFormat('legacy')
        let names = _.compact(_.pluck(cards, 'name'))
        expect(cards.length).to.equal(names.length)
      })
    })
  })
})

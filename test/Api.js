import _ from 'lodash'
import chai from 'chai'
import Api from '../src/Api'

let expect = chai.expect
let api = new Api()

describe('Api', () => {
  it('cannot call a private method', () => {
    expect(api).not.to.include.keys('returnError')
  })

  it('gets release names with ease', () => {
    expect(api.releaseNames).not.to.be.empty
  })

  it('retrieves a set by name', () => {
    var setName = 'Khans of Tarkir'
    var cards = api.getRelease(setName)

    expect(cards).not.to.be.empty
    expect(cards.name).to.equal(setName)

    setName = 'dragons of tarkir' //lowercased
    cards = api.getRelease(setName)

    expect(cards).not.to.be.empty
    expect(cards.name).to.equal('Dragons of Tarkir')
  })

  it('returns an error for an invalid set name', () => {
    var json = api.getRelease('bacon')
    expect(json).to.include.keys('error')
  })
})

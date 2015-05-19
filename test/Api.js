import _ from 'underscore'
import chai from 'chai'
import Api from '../src/Api'

let expect = chai.expect
let api = new Api()

describe('Api', () => {
  it('gets release names with ease', () => {
    expect(api.releaseNames).not.to.be.empty
  })

  it('retrieves a set', () => {
    var setName = 'Khans of Tarkir'
    var cards = api.getRelease(setName)

    expect(cards).not.to.be.empty
    expect(cards.name).to.equal(setName)
  })
})

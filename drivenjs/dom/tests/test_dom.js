const {suite, test, assert} = require('drivenjs').test
const dom = require('drivenjs').dom

suite('Simulate the dom in nodejs if not in browser', () => {

  test('returns a window element with document when require the dom', () => {
    assert.defined(dom.document)
  })

  test('Object needs to have get and set', () => {
  })

})

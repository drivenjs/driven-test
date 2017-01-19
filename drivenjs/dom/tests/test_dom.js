const {suite, test, assert} = require('drivenjs').test

suite('Simulate the dom in nodejs if not in browser', () => {
  test('returns a window element with document when require the dom', () => {
    const dom = require('drivenjs').dom
    assert.defined(dom.document)
  })
})

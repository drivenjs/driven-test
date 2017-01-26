const {suite, test, assert, async, exceptions} = require('drivenjs').test
const asyncTest = require('drivenjs').test.async

suite('Async tests in Driven', () => {
  test('async block the execution.', async((resolve) => {
    var asyncRaised = false

    setTimeout(() => {
      assert.true(asyncRaised)
      resolve()
    }, 2000)

    asyncRaised = true
  }))
})

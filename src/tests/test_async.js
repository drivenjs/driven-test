const {suite, test, assert, async, exceptions} = require('driven-test')

suite('Async tests in Driven', () => {
  test('async block the execution.', async((resolve) => {
    var asyncRaised = false

    setTimeout(() => {
      assert.true(asyncRaised)
      resolve()
    }, 500)

    asyncRaised = true
  }, 1000))
})

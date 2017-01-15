const test  = require('../drivenjs/test')
const testExceptions = require('../drivenjs/test/exceptions.js')

with(test) {

  test('add the test.queue when start a test', () => {
    const testItem = test.queue.find((item) => { 
      return item.description === 'add the test.queue when start a test'
    })
    assert(testItem !== undefined)
  })

  test('throw AssertError when a pass false to asset', () => {
    assertThrow(() => assert(false), testExceptions.AssertError)
  })

  test('throw error if assetThrow was called and no exception is raised', () => {
    assertThrow(() => {
      assertThrow(() => "no error here")
    })
  })

  test('throw error if the exception type is diferent of the provide', () => {
    assertThrow(() => {
      assertThrow(() => {
        throw "no error here"
      }, Number)
    })
  })

  test('passed returns true if all tests are passed', () => {
    const originalQueue = test.queue
    test.queue = [{
      passed: true  
    }]
    try {
      assert(test.passed())
    } catch(err) {
      // Prevent a undebuggable error stack
      throw err
    } finally {
      test.queue = originalQueue
    }
  })

  test('passed returns false if any test fail', () => {
    const originalPassed = test.queue[0].passed
    test.queue[0].passed = false
    try {
      assert(!test.passed())
    } catch(err) {
      // Prevent a undebuggable error stack
      throw err
    } finally {
      test.queue[0].passed = originalPassed
    }
  })

}

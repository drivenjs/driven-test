const drivenjs  = require('drivenjs')
const drivenTest = drivenjs.test
const exceptions = drivenTest.exceptions

with(drivenTest) {
  var tearDownCalled = false

  describe('test the drivenjs test framework', () => {
    var setuped = false
    var beforeCalls = 0
    var afterCalls = 0

    setup(() => {
      setuped = true
    })

    beforeAll(() => {
      beforeCalls++
    })

    afterAll(() => {
      afterCalls++
    })

    teardown(() => {
      tearDownCalled = true    
    })

    test('register the test when start a test', () => {
      const thisTest = drivenTest
        .register
          .describes
          .find((describe) => describe.description === 'test the drivenjs test framework')
            .tests
            .find((test) => test.description === 'register the test when start a test')
      assert(thisTest !== undefined)
    })

    test('throw AssertError when a pass false to asset', () => {
      assertThrow(() => assert(false), exceptions.AssertError)
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

    test('call setup before tests', () => {
      assert(setuped)
    })

    test('beforeAll is called before run a test', () => {
      assert(beforeCalls === 6)
    })

    test('afterAll is called after run a test', () => {
      assert(afterCalls === 6)
    })

    test('teardown isn\'t called', () => {
      assert(!tearDownCalled)
    })
  })

  describe('another test describe to test the teardown', () => {
      
    test('teardown of previus describe is called', () => {
      assert(tearDownCalled)
    })

  })
}

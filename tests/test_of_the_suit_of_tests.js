const drivenjs  = require('drivenjs')
const drivenTest = drivenjs.test
const exceptions = drivenTest.exceptions

with(drivenTest) {
  var setuped = false
  var calls = 0

  describe('test the drivenjs test framework', () => {
    setup(() => {
      setuped = true
    })

    beforeAll(() => {
      calls++
    })

    drivenTest.test('register the test when start a test', () => {
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

  })
}

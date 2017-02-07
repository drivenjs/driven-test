const drivenTest = require('driven-test')
const {suite, test, assert, setup, teardown, beforeAll, afterAll, exceptions} = drivenTest

var setuped = false
var tearDownCalled = false
var beforeCalls = 0
var afterCalls = 0
var beforeCalled = false
var afterCalled = false

suite('test the drivenjs test framework', () => {
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
    const thisSuite = drivenTest.register.suites
      .find((suite) => suite.description === 'test the drivenjs test framework')

    const thisTest = thisSuite.tests
      .find((test) => test.description === 'register the test when start a test')

    assert.true(thisTest !== undefined)
  })
  test('throw error if assetThrow was called and no exception is raised', () => {
    assert.throw(() => {
      assert.throw(() => "no error here")
    })
  })
  test('throw error if the exception type is diferent of the provide', () => {
    assert.throw(() => {
      assert.throw(() => {
        throw "no error here"
      }, Number)
    })
  })
  test('call setup before tests', () => {
    assert.true(setuped)
  })
  test('teardown isn\'t called', () => {
    assert.false(tearDownCalled)
  })
})

suite('another test suite to test the beforeAll and afterall teardown', () => {
  test('beforeAll is called before run a test', () => {
    assert.equal(beforeCalls, 5)
  })
  test('afterAll is called after run a test', () => {
    assert.equal(afterCalls, 5)
  })
  test('teardown of previus suite is called', () => {
    assert.true(tearDownCalled)
  })
})

suite('suite to test if beforeAll is called and afterAll not', () => {
  beforeAll(() => {
    beforeCalled = true
  })
  afterAll(() => {
    afterCalled = true
  })
  test('beforeAll is called', () => {
    assert.true(beforeCalled)
    assert.false(afterCalled)
  })
})

suite('suite to test if afterAll is called', () => {
  test('beforeAll is called', () => {
    assert.true(afterCalled)
  })
})

const drivenjs  = require('drivenjs')

const suite = require('drivenjs').test.suite
const test = require('drivenjs').test.test
const assert = require('drivenjs').test.assert 
const setup = require('drivenjs').test.setup
const teardown = require('drivenjs').test.teardown
const beforeAll = require('drivenjs').test.beforeAll
const afterAll = require('drivenjs').test.afterAll

const drivenTest = drivenjs.test
const exceptions = drivenTest.exceptions

var tearDownCalled = false

suite('test the drivenjs test framework', () => {
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
        .suites
        .find((suite) => suite.description === 'test the drivenjs test framework')
          .tests
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

  test('beforeAll is called before run a test', () => {
    assert.equal(beforeCalls, 5)
  })

  test('afterAll is called after run a test', () => {
    assert.equal(afterCalls, 5)
  })

  test('teardown isn\'t called', () => {
    assert.false(tearDownCalled)
  })

})

suite('another test suite to test the teardown', () => {
    
  test('teardown of previus suite is called', () => {
    assert.true(tearDownCalled)
  })

})

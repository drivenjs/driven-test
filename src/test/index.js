const exceptions = require('./exceptions')
const register = require('./register')
const runner = require('./runner')
const assert = require('./assert')
const async = require('./async')

const drivenTest = {
  /**
   * Create a new suite of tests
   * @param {string} description - The description of the suit
   * @param {function} discoverTests - The body of the suite. this will describe all tests
   */
  suite(description, discoverTests) {
    new register.SuiteRegister(description)
    discoverTests()
  },

  /**
   * This is the test function this is used to suite your drivenTest.
   * @example
   * test("1 + 1 is 2", () => {
   *   assert(1 + 1 === 2)
   * }
   * @param {string} description - The description of the test
   * @param {function} fn - The test function 
   */
  test(description, fn) {
    register.lastSuite.addTest(description, fn)
  },

  /**
   * Run before execute all tests
   */
  setup(fn) {
    register.lastSuite.setup = fn
  },

  /**
   * Run after execute all tests
   */
  teardown(fn) {
    register.lastSuite.teardown = fn
  },

  /**
   * Set the beforeAll function
   */
  beforeAll(fn) { 
    register.lastSuite.beforeAll = fn
  },

  /**
   * Set the afterAll function
   */
  afterAll(fn) { 
    register.lastSuite.afterAll = fn
  },

  assert: assert,
  async: async,
  exceptions: exceptions,
  register: register,
  runner: runner
}

module.exports = drivenTest

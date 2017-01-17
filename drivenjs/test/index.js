const chalk = require('chalk')
const exceptions = require('./exceptions')
const register = require('./register')
const runner = require('./runner')

/**
 * Simple assert function
 * @ param {Boolean} truth
 * @throws {AssertError} if truth is false
 */
function assert(truth, msg="") {
  if (truth !== true)
    throw new exceptions.AssertError(msg)
}


var drivenTest = {
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
    register.lastSuite.addTest(
      new register.TestRegister(description, fn)
    )
  },

  suite(msg, discoverTests) {
    new register.SuiteRegister(msg)
    discoverTests()
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

  assert: {
    /**
     * Assert if is true function
     * @ param {Boolean} truth
     * @throws {AssertError} if truth is false
     */
    true(truth, msg="") {
      var errorMsg = msg + " " + truth + " is not true"
      assert(truth === true, errorMsg)
    },

    /**
     * Assert if is false function
     * @ param {Boolean} truth
     * @throws {AssertError} if truth is false
     */
    false(falsely, msg="") {
      var errorMsg = msg + " " + falsely + " is not false"
      assert(falsely === false, errorMsg)
    },

    /**
     * Assert if two values are equals function
     * @ param val1
     * @ param val2
     * @throws {AssertError} if truth is false
     */
    equal(val1, val2, msg="") {
      var errorMsg = msg + " " + val1 + " is not equal to " + val2
      assert(val1 === val2, errorMsg)
    },

    /**
     * Assert if a value is in list a function
     * @ param val
     * @ param iter
     * @throws {AssertError} if truth is false
     */
    in(val, iter, msg="") {
      var errorMsg = msg + " " + val + " is not in [" + iter + "]"
      assert(iter.find((elem) => elem === val) !== undefined, errorMsg)
    },

    /**
     * Assert if an exception is raised
     * @ param {function} fn - A function then raises exception
     * @ param {exception} exception - A optional exception type
     * @returns {Bolean}
     * @throws {AssertInvalidThrowError} if exception is diferent then expected
     * @throws {AssertNonThrowError} if no exception raised
     */
    throw(fn, exception) {
      var raised = false;
      debugger;
      try{
        fn()
      } catch (err) {
        raised = true
        debugger
        if (exception !== undefined && !(err instanceof exception))
          throw new exceptions.AssertInvalidThrowError()
      }

      if (!raised) 
        throw new exceptions.AssertNonThrowError()
    },

    /**
     * Assert if two values are not equals function
     * @ param val1
     * @ param val2
     * @throws {AssertError} if truth is false
     */
    not: {
      equal(val1, val2, msg="") {
        var errorMsg = msg + " " + val1 + " is equal to " + val2
        assert(val1 !== val2, errorMsg)
      },

      /**
       * Assert if a value is not in a list function
       * @ param val
       * @ param iter
       * @throws {AssertError} if truth is false
       */
      in(val, iter, msg="") {
        var errorMsg = msg + " " + val + " is in [" + iter + "]"
        assert(iter.find((elem) => elem === val) === undefined, errorMsg)
      },
    }
  },

  exceptions: exceptions,
  runner: runner,
  register: register
}

module.exports = drivenTest

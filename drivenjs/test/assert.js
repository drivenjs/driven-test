const exceptions = require('./exceptions')

/**
 * Simple assert function
 * @ param {Boolean} truth
 * @throws {AssertError} if truth is false
 */
function assert(truth, message="") {
  if (truth !== true)
    throw new exceptions.AssertError(message)
}

module.exports = {
  /**
   * Assert if is true function
   * @ param {Boolean} truth
   * @throws {AssertError} if truth is false
   */
  true(truth, message="") {
    var errorMessage = message + " " + truth + " is not true"
    assert(truth === true, errorMessage)
  },

  /**
   * Assert if is false function
   * @ param {Boolean} truth
   * @throws {AssertError} if truth is false
   */
  false(falsely, message="") {
    var errorMessage = message + " " + falsely + " is not false"
    assert(falsely === false, errorMessage)
  },

  /**
   * Assert if two values are equals function
   * @ param val1
   * @ param val2
   * @throws {AssertError} if truth is false
   */
  equal(val1, val2, message="") {
    var errorMessage = message + " " + val1 + " is not equal to " + val2
    assert(val1 === val2, errorMessage)
  },

  /**
   * Assert if a value is in list a function
   * @ param val
   * @ param iter
   * @throws {AssertError} if truth is false
   */
  in(val, iter, message="") {
    var errorMessage = message + " " + val + " is not in [" + iter + "]"
    assert(iter.find((elem) => elem === val) !== undefined, errorMessage)
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
    equal(val1, val2, message="") {
      var errorMessage = message + " " + val1 + " is equal to " + val2
      assert(val1 !== val2, errorMessage)
    },

    /**
     * Assert if a value is not in a list function
     * @ param val
     * @ param iter
     * @throws {AssertError} if truth is false
     */
    in(val, iter, message="") {
      var errorMessage = message + " " + val + " is in [" + iter + "]"
      assert(iter.find((elem) => elem === val) === undefined, errorMessage)
    },
  }
}

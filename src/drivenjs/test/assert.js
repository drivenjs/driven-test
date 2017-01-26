const exceptions = require('./exceptions')

/**
 * Simple assert function
 * @ param {Boolean} truth
 * @throws {AssertError} if truth is false
 */
assert = (truth, message="") => {
  if (truth !== true)
    throw new exceptions.AssertError(message)
}


/**
 * Validate if the exception is equal
 */
validateException = (err, exception) => {
  return exception !== undefined && !(err instanceof exception)
}

class Assert {
  /**
   * Assert if is true function
   * @ param {Boolean} truth
   * @throws {AssertError} if truth is false
   */
  true(truth, message="") {
    const errorMessage = message + " " + truth + " is not true"
    assert(truth === true, errorMessage)
  }

  /**
   * Assert if is false function
   * @ param {Boolean} truth
   * @throws {AssertError} if truth is false
   */
  false(falsely, message="") {
    const errorMessage = message + " " + falsely + " is not false"
    assert(falsely === false, errorMessage)
  }

  /**
   * Assert if two values are equals function
   * @ param val1
   * @ param val2
   * @throws {AssertError} if truth is false
   */
  equal(val1, val2, message="") {
    const errorMessage = message + " " + val1 + " is not equal to " + val2
    assert(val1 === val2, errorMessage)
  }

  /**
   * Assert if a value is in list a function
   * @ param val
   * @ param iter
   * @throws {AssertError} if truth is false
   */
  in(val, iter, message="") {
    const errorMessage = message + " " + val + " is not in [" + iter + "]"
    assert(iter.find((elem) => elem === val) !== undefined, errorMessage)
  }

  /**
   * Assert if a value is defined
   * @ param {} value
   * @throws {AssertError} if truth is false
   */
  defined(value, message="") {
    const errorMessage = message + " " + value + " is not defined"
    assert(value !== undefined, errorMessage)
  }

  /**
   * Assert if an exception is raised
   * @ param {function} fn - A function then raises exception
   * @ param {exception} exception - A optional exception type
   * @returns {Bolean}
   * @throws {AssertInvalidThrowError} if exception is diferent then expected
   * @throws {AssertNonThrowError} if no exception raised
   */
  throw(fn, exception) {
    try {
      fn()
    } catch (err) {
      if (validateException(err, exception)) {
        throw new exceptions.AssertInvalidThrowError()
      }
      return
    }
    throw new exceptions.AssertNonThrowError()
  }

  constructor() {
    this.not = {
      /**
       * Assert if two values are not equals function
       * @ param val1
       * @ param val2
       * @throws {AssertError} if truth is false
       */
      equal(val1, val2, message="") {
        const errorMessage = message + " " + val1 + " is equal to " + val2
        assert(val1 !== val2, errorMessage)
      },

      /**
       * Assert if a value is not in a list function
       * @ param val
       * @ param iter
       * @throws {AssertError} if truth is false
       */
      in(val, iter, message="") {
        const errorMessage = message + " " + val + " is in [" + iter + "]"
        assert(iter.find((elem) => elem === val) === undefined, errorMessage)
      },

      /**
       * Assert if a value is defined
       * @ param {} value
       * @throws {AssertError} if truth is false
       */
      defined(value, message="") {
        const errorMessage = message + " " + value + " is defined"
        assert(value === undefined, errorMessage)
      },
    }
  }
}

module.exports = new Assert()

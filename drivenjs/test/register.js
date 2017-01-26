const suites = []

const toPromise = (fn) => {
  try {
    const promise = fn() || {}
    if (typeof promise.then === 'function') {
      return promise
    }
    return Promise.resolve(promise)
  } catch (err) {
    return Promise.reject(err)
  }
}


var exports = module.exports = {
  suites: suites,

  passed() {
    return suites.find((suite) => suite.passed() === false) === undefined 
  }
}

registerSuite = (suite) => {
  exports.lastSuite = suite
  suites.push(suite)
}


class SuiteRunner {
  constructor(tests, testStart, testOk, testFail) {
    this.tests = tests
    this.testStart = testStart
    this.testOk = testOk
    this.testFail = testFail
    this.rejected = false
  }

  runTests() {
    if(this.tests.length === 0) {
      if (this.rejected) {
        return this.reject()
      } else {
        return this.resolve()
      }
    }
    const test = this.tests.shift()

    test.run(this.testStart, this.testOk, this.testFail).then(
      () => {
        this.runTests()
      },
      () => {
        this.rejected = true
        this.runTests()
      }
    )
  }

  run() {
    return new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject

      this.runTests()
    })
  }
}


class SuiteRegister {
  constructor(description) {
    this.tests = []
    this.description = description
    this.setup = () => undefined
    this.teardown = () => undefined
    this.beforeAll = () => undefined
    this.afterAll = () => undefined
    this.lastTest = undefined
    this.totalRunned = 0

    registerSuite(this)
  }

  isFirst() {
    return this.totalRunned === 0  
  }

  isLast() {
    return this.totalRunned === this.tests.length
  }

  passed() {
    return this.tests.find((test) => test.passed === false) === undefined
  }

  addTest(description, fn) {
    this.lastTest = new TestRegister(description, fn, this)
    this.tests.push(this.lastTest)
  }

  run(testStart, testOk, testFail) {
    const tests = this.tests.slice(0)
    return new SuiteRunner(tests, testStart, testOk, testFail).run()
  }
}

class TestRegister {
  constructor(description, fn, suite) {
    this.description = description
    this.fn = fn
    this.suite = suite
    this.passed = false
    this.error = undefined
  }

  before() {
    if (this.suite.isFirst()) {
      this.suite.setup()
    }
    this.suite.beforeAll()
  }

  after() {
    this.suite.afterAll()
    this.suite.totalRunned++

    if (this.suite.isLast()) {
      this.suite.teardown()
    }
  }

  run(testStart, testOk, testFail) {
    return new Promise((resolve, reject) => {
      this.before()
      testStart(this)

      const promise = toPromise(this.fn).catch(
        (error) => {
          this.error = error
          reject()
        }
      ).then(resolve, reject)

      this.after()
    }).catch(
      (err) => {
        testFail(this)
      }).then(
      () => testOk(this),
      () => testFail(this)
    )  
  }
}

exports.SuiteRegister = SuiteRegister
exports.TestRegister = TestRegister

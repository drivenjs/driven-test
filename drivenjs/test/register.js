const suites = []

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


class SuiteRegister {
  constructor(description) {
    this.tests = []
    this.description = description
    this.setup = () => undefined
    this.teardown = () => undefined
    this.beforeAll = () => undefined
    this.afterAll = () => undefined

    registerSuite(this)
  }

  passed() {
    return this.tests.find((test) => test.passed === false) === undefined
  }

  addTest(test) {
    this.tests.push(test)
  }

  *runTests() {
    this.setup()
    for(let test of this.tests) {
      this.beforeAll()
      test.run()
      this.afterAll()
      yield test
    }
    this.teardown()
  }
}

class TestRegister {
  constructor(description, fn) {
    this.description = description
    this.fn = fn
    this.passed = false
    this.error = undefined
  }

  run() {
    try {
      this.fn()
      this.passed = true
    } catch (err) {
      this.error = err
    }
  }

}

exports.SuiteRegister = SuiteRegister
exports.TestRegister = TestRegister

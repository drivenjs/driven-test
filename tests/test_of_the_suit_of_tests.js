var test = require('../src/test')

test("when 2 and 2 are added gives 3", () => {
  test.assert(2 + 2 == 3)
})

test("when 2 and 2 are added gives 4", () => {
  test.assert(2 + 2 == 4)
})

test("when get an attribute of undefined raises TypeError", () => {
  test.assertThrow(() => {
    var a = undefined
    a.test()
  }, Number)
})

test("when 0/0 raises error", () => {
  test.assertThrow(() => {
    0 / 0
  })
})

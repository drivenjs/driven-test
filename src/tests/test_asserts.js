const {suite, test, assert, exceptions} = require('drivenjs').test

suite('test asserts', () => {
  test('assert.true', () => {
    assert.true(true)
    assert.throw(() => assert.true(false), exceptions.AssertError)
  })
  test('assert.false', () => {
    assert.false(false)
    assert.throw(() => assert.false(true), exceptions.AssertError)
  })
  test('assert.equal', () => {
    assert.equal(1, 1)
    assert.throw(() => assert.equal('1', 1), exceptions.AssertError)
  })
  test('assert.defined', () => {
    assert.defined(1)
    assert.throw(() => assert.defined(undefined), exceptions.AssertError)
  })
  test('assert.not.equal', () => {
    assert.not.equal(1, '1')
    assert.throw(() => assert.not.equal('1', '1'), exceptions.AssertError)
  })
  test('assert.in', () => {
    assert.in(1, [1, 2, 3, 4])
    assert.throw(() => assert.in('1', [1, 2, 3, 4]), exceptions.AssertError)
  })
  test('assert.not.in', () => {
    assert.not.in('1', [1, 2, 3, 4])
    assert.throw(() => assert.not.in(1, [1, 2, 3, 4]), exceptions.AssertError)
  })
  test('assert.not.defined', () => {
    assert.not.defined(undefined)
    assert.throw(() => assert.not.defined(1), exceptions.AssertError)
  })
})

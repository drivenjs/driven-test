const suite = require('drivenjs').test.suite
const test = require('drivenjs').test.test
const assert = require('drivenjs').test.assert 
const setup = require('drivenjs').test.setup
const teardown = require('drivenjs').test.teardown
const beforeAll = require('drivenjs').test.beforeAll
const afterAll = require('drivenjs').test.afterAll
const exceptions = require('drivenjs').test.exceptions

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
})

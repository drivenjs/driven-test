const {suite, test, assert} = require('drivenjs').test
const {DrivenObject} = require('drivenjs').objects


suite('DrivenObject', () => {

  test('if the element don\'t allow get property directely', () => {
    const myObject = new DrivenObject({
      key: 'value'
    })
    assert.not.defined(myObject.privateVar)
    assert.equal(myObject.get('key'), 'value')
  })
  
  test('change the element only using set', () => {
    const myObject = new DrivenObject()
    assert.equal(myObject.set('key', 'value'), 'value')
    assert.equal(myObject.get('key'), 'value')
  })

  test('update many fields', () => {
    const myObject = new DrivenObject()
    myObject.update({
      key1: 'value1',
      key2: 'value2'
    })

    assert.equal(myObject.get('key1'), 'value1')
    assert.equal(myObject.get('key2'), 'value2')
  })

  test('ovserve changes in an object', () => {
    const myObject = new DrivenObject({ key: 'value' })

    var called = false
    myObject.observe(() => {
      called = true
    })

    myObject.set('key', 'value2')
    assert.true(called)
  })

  test('ovserve changes in an object', () => {
    const myObject = new DrivenObject({ key: 'value' })
    var called = false

    const observer = () => {
      called = true
    }
    myObject.observe(observer)
    myObject.unObserve(observer)

    myObject.set('key', 'value2')
    assert.false(called)
  })

  test('neasted objects are transformed in DrivenObjects too', () => {
    const myObject = new DrivenObject({
      nested: { key: 'value' }
    })
    const nested = myObject.get('nested')

    assert.true(nested instanceof DrivenObject)
    assert.defined(nested.get('key'))
  })

})

<p align="center">
  <img src="https://cdn.rawgit.com/carlosmaniero/driven.js/63355b8175f7f6d6a6cb3cdb58d05793e7074ca0/assets/img/logo.svg" alt="logo">
</p>

[![Build Status](https://travis-ci.org/drivenjs/driven-test.svg?branch=master)](https://travis-ci.org/drivenjs/driven-test)

# Driven Teste Suite

Use this package to test your application. Follow this exemple:

```js
suite('test the drivenjs test framework', () => {
  setup(() => {
    console.log('Running before running tests')
  })

  beforeAll(() => {
    console.log('Running before all test')
  })

  afterAll(() => {
    console.log('Running after all test')
  })

  teardown(() => {
    console.log('Running after running tests')
  })

  test('1 + 1 equal 2', () => {
    assert.equal(1 + 1, 2)
  })
})
```

## Manifest

All fucking line of this fucking framework will be written oriented by tests.

All fucking features will be simple.
Complexity is a fucking shit that we don't need to deal with.

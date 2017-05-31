# soft-method-override

handy way to override an internal method from an Object in runtime when you need to execute a different flow for that method

----
<a href="https://nodei.co/npm/soft-method-override/"><img src="https://nodei.co/npm/soft-method-override.png?downloads=true"></a>

[![Build Status](https://travis-ci.org/joaquimserafim/soft-method-override.svg?branch=master)](https://travis-ci.org/joaquimserafim/soft-method-override)[![Coverage Status](https://coveralls.io/repos/github/joaquimserafim/soft-method-override/badge.svg)](https://coveralls.io/github/joaquimserafim/soft-method-override)[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://github.com/joaquimserafim/soft-method-override/blob/master/LICENSE)[![NodeJS](https://img.shields.io/badge/node-6.x.x-brightgreen.svg?style=flat-square)](https://github.com/joaquimserafim/soft-method-override/blob/master/package.json#L42)

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


### api
`const softMethodOverride = require('soft-method-override')`

```js
softMethodOverride(
    `this - value of the enclosing execution context`,
    `the method name to be override - string`,
    `the new method - function`
  )
```


### example

```js
const softMethodOverride = require('soft-method-override')

class Hitman {

  constructor () {
    this._hitmans = []
  }

  add (name) {
    if (typeof name !== 'string' || !name.length) {
      softMethodOverride(this, 'contract', (cb) => {
        cb(new Error('no name no contract'))
      })
    } else {
      this._hitmans.push(name)
    }

    return this
  }

  contract (cb) {
    cb(null, 'yay!! a new Chapter')
  }
}

//
//
//

const john = new Hitman()

john
  .add()
  .contract((err, res) => {
    assert.equal(err.message, 'no name no contract')
    assert.deepEqual(res, undefined)
  })

```


#### ISC License (ISC)

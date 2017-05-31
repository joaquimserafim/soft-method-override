/*
eslint
no-multi-spaces: ["error", {exceptions: {"VariableDeclarator": true}}]
padded-blocks: ["error", {"classes": "always"}]
max-len: ["error", 80]
*/
'use strict'

const test = require('tape')

const softMethodOverride = require('.')

test('testing a pathetic scenario', function (assert) {
  this._hitmans = []

  this.add = (name) => {
    this._hitmans.push(name)
  }

  this.get = () => {
    return this._hitmans
  }

  softMethodOverride(this, 'add', newAdd)

  this.add('John', 'Wick')

  assert.deepEqual(this.get(), ['John Wick'])

  assert.end()
})

function newAdd (name, surname) {
  this._hitmans.push(`${name} ${surname}`)
}

//
//
//

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

const john = new Hitman()

test('using `softMethodOverride` inside of a class', function (assert) {

  john
    .add()
    .contract((err, res) => {
      assert.equal(err.message, 'no name no contract')
      assert.deepEqual(res, undefined)
      assert.end()
    })
})

test('checking if `john.add` still have the same definition as' +
  ' `Hitman.prototype.add`',
  function (assert) {
    assert.deepEqual(john.add, Hitman.prototype.add)
    assert.end()
  }
)

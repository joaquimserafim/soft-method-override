/*
eslint
no-multi-spaces: ["error", {exceptions: {"VariableDeclarator": true}}]
padded-blocks: ["error", {"classes": "always"}]
max-len: ["error", 80]
*/
'use strict'

module.exports = softMethodOverride

function softMethodOverride (self, methodName, newMethod) {
  self[methodName] = newMethod
}

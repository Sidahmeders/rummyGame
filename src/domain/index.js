const getUniqueId = () => `id::${Date.now()}::${Math.floor(Math.random() * 99999)}`

const buildMakeUser = require('./makeUser.js')

const makeUser = buildMakeUser({ getUniqueId })

module.exports = Object.freeze({ makeUser })

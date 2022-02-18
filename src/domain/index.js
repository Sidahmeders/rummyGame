const getUniqueId = () => `id::${Date.now()}::${Math.floor(Math.random() * 99999)}`

const buildMakeUser = require('./makeUser.js')
const buildMakeRoom = require('./makeRoom.js')

const makeUser = buildMakeUser({ getUniqueId })
const makeRoom = buildMakeRoom({ getUniqueId })

module.exports = Object.freeze({ makeUser, makeRoom })

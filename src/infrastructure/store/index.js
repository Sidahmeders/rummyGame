const InMemoryGames = require('./InMemoryGames')
const User = require('./models/user')
const Room = require('./models/room')

const makeUsersDB = require('./repositories/usersDB')
const makeRoomsDB = require('./repositories/roomsDB')

module.exports = {
  InMemoryGames,
  usersDB: makeUsersDB({ model: new User() }),
  roomsDB: makeRoomsDB({ model: new Room() }),
}

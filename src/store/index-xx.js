const LocalFsDB = require('./db/LocalFsDB.js')

const User = require('./models/user.js')
const Room = require('./models/room.js')

const makeUsersDB = require('./repositories/usersDB.js')
const makeRoomsDB = require('./repositories/roomsDB.js')

module.exports = {
  LocalFsDB,
  usersDB: makeUsersDB({ model: new User() }),
  roomsDB: makeRoomsDB({ model: new Room() }),
}

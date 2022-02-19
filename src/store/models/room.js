const LocalFsDB = require('../db/LocalFsDB.js')

class Room extends LocalFsDB {
  constructor(id, roomName, password, createdAt) {
    this.id = id
    this.roomName = roomName
    this.password = password
    this.createdAt = createdAt
  }

  add(room) {
    const { roomName, password } = room
    let rooms = this.queryDB('rooms')
    let targetRoom = rooms[roomName]
    if (targetRoom) throw Error('room name already exist..')
    // handle pushing new rooms to database
    rooms[roomName] = { password, players: [] }
    // write back the new data to our json file
    this.persistDB('rooms', rooms, 'new room has been added...')
  }

  getById(id) {}

  getAll() {}

  update(id) {}

  delete(id) {}
}

module.exports = Room

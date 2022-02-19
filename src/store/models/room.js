const LocalFsDB = require('../db/LocalFsDB.js')

class Room extends LocalFsDB {
  // private variables
  #props
  #key
  // private methods
  #validatePops() {
    if (typeof this.#props !== 'object') throw Error('room type must be an Object')
    if (!Object.prototype.hasOwnProperty.call(this.#props, 'roomName')) throw Error('roomName is required!')
    if (!Object.prototype.hasOwnProperty.call(this.#props, 'password')) throw Error('password is required!')
    if (!this.#key) throw Error('key is null or undefined')
  }

  constructor(props = {}) {
    super()
    this.#props = props
    this.#key = String(props?.roomName)
  }

  async save() {
    this.#validatePops()
    const rooms = await this.queryDB('rooms')
    const isRoomExist = rooms[this.#key]
    if (isRoomExist) throw Error(`${this.#key} roomName already exist..`)
    // handle pushing a new room to the collection
    rooms[this.#key] = this.#props
    // write back the new collection to our json file
    await this.persistDB('rooms', rooms, 'new room has been created...')
  }

  async create(room) {
    this.#props = room
    this.#key = String(room?.roomName)
    await this.save()
  }

  async findAll() {
    const allRooms = await this.queryDB('rooms')
    return allRooms || []
  }
}

module.exports = Room

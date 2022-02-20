const LocalFsDB = require('../../db/LocalFsDB')

class Room extends LocalFsDB {
  #props
  #key

  constructor(props = {}) {
    super()
    this.#props = props
    this.#key = props?.roomName
  }

  async save() {
    if (typeof this.#props !== 'object') throw Error('room type must be an Object')
    if (!Object.prototype.hasOwnProperty.call(this.#props, 'roomName')) throw Error('roomName is required!')
    if (!Object.prototype.hasOwnProperty.call(this.#props, 'password')) throw Error('password is required!')
    if (!this.#key) throw Error('key is null or undefined')

    const rooms = await this.findAll()
    // handle pushing a new room to the collection and save
    rooms[this.#key] = this.#props
    // write the new collection to our json file
    await this.persistDB('rooms', rooms, 'new room has been created...')
  }

  async create(room = {}) {
    this.#props = room
    this.#key = room?.roomName
    await this.save()
  }

  async update(roomName, room = {}) {
    const rooms = await this.queryDB('rooms')
    this.#props = Object.assign(rooms[roomName], room)
    this.#key = roomName
    await this.save()
  }

  async findAll() {
    const rooms = await this.queryDB('rooms')
    return rooms || {}
  }
}

module.exports = Room

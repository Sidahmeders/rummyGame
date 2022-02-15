const store = require('../store')

module.exports = async function createRooms(req, res) {
  try {
    const { roomName, password } = req.body
    if (!roomName || !password) throw Error('please fill in the room name and password')

    store.createRoom(roomName, password)
    res.status(201).json('new room added successfully')
  } catch (err) {
    res.status(400).json({ errorMsg: err.message })
  }
}

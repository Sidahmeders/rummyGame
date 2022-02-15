const store = require('../store')

module.exports = function getAllRooms(req, res) {
  const rooms = store.getAllRooms()
  res.status(200).json({ rooms })
}

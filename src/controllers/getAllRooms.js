const store = require('../store')

module.exports = async function getAllRooms(req, res) {
  const rooms = await store.getAllRooms()
  res.status(200).json({ rooms })
}

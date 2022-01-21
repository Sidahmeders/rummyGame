const readJsonData = require('../utils/readJsonData')

module.exports = function getAllRooms(req, res) {
  const roomsData = readJsonData()
  const rooms = JSON.parse(roomsData)
  res.status(200).json({ rooms })
}

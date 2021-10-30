const getJsonData = require('../utils/getJsonData')

module.exports = function getAllRooms(req, res) {
    const roomsData = getJsonData()

    const rooms = JSON.parse(roomsData)
    res.status(200).json({ rooms })
}

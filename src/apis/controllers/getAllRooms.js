module.exports = function makeGetAllRooms({ roomsDB }) {
  return async function getAllRooms(req, res) {
    try {
      const rooms = await roomsDB.listRooms()
      res.status(200).json({ rooms })
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}

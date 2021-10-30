const readJsonData = require('../utils/readJsonData')
const writeJsonData = require('../utils/writeJsonData')

module.exports = async function createRooms(req, res) {
    const { roomName, password } = req.body

    if (!roomName || !password) {
        res.status(400).json({ error: "please fill in the userName and password" })
    } else {
        const roomsData = readJsonData()

        // handle pushing new rooms to database
        const rooms = JSON.parse(roomsData)
        rooms.push({ roomName, password })
        // write back the new data to our json file
        await writeJsonData(rooms, 'new room has been added...')

        res.status(201).json("new room added successfully")
    }
}
const readJsonData = require('../utils/readJsonData')
const writeJsonData = require('../utils/writeJsonData')

module.exports = async function createRooms(req, res) {
    const { roomName, password } = req.body

    if (!roomName || !password) {
        res.status(400).json({ error: 'please fill in the userName and password' })
        return
    }

    try {
        let rooms = JSON.parse(readJsonData())

        if (rooms[roomName]) {
            throw Error('room name already exist..')
        }

        // handle pushing new rooms to database
        rooms[roomName] = { password, players: [] }
        // write back the new data to our json file
        await writeJsonData(rooms, 'new room has been added...')

        res.status(201).json('new room added successfully')
    } catch (err) {
        res.status(400).json({ errorMsg: err.message })
    }
}

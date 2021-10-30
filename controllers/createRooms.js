const path = require('path')
const fs = require('fs')

module.exports = function createRooms(req, res) {
    const { roomName, password } = req.body

    if (!roomName || !password) {
        res.status(400).json({ error: "please fill in the userName and password" })
    } else {
        const roomsData = fs.readFileSync(
            path.join(`${__dirname}/../data`, 'rooms.json'),
            'utf8', 
            (err, data) => {
                if(err) throw err
                return data
            }
        )

        // handle pushing new rooms to database
        const rooms = JSON.parse(roomsData)
        rooms.push({ roomName, password })

        // write back the new data to our json file
        fs.writeFile(
            path.join(`${__dirname}/../data`, 'rooms.json'),
            JSON.stringify(rooms), err => {
                if(err) {
                    throw Error(err.message)
                }
                console.log('new room has been added...')
            }
        )

        res.status(201).json("new room added successfully")
    }
}
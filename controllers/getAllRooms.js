const path = require('path')
const fs = require('fs')

module.exports = function getAllRooms(req, res) {
    const roomsData = fs.readFileSync(
        path.join(`${__dirname}/../data`, 'rooms.json'), 
        'utf8', (err, data) => {
            if(err) throw err
            return data
        }
    )

    const rooms = JSON.parse(roomsData)
    res.status(200).json({ rooms })
}

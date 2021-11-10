const path = require('path')
const fs = require('fs')

module.exports = function readJsonData() {
    const roomsData = fs.readFileSync(
        path.join(`${__dirname}/../store`, 'rooms.json'),
        'utf8',
        (err, data) => {
            if (err) throw err
            return data
        }
    )

    return roomsData
}

const path = require('path')
const fs = require('fs')

module.exports = function getJsonData() {
    const roomsData = fs.readFileSync(
        path.join(`${__dirname}/../data`, 'rooms.json'),
        'utf8', 
        (err, data) => {
            if(err) throw err
            return data
        }
    )

    return roomsData
}
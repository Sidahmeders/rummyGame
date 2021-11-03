const fs = require('fs')
const path = require('path')

module.exports = function writeJsonData(data, message) {
    fs.writeFileSync(
        path.join(`${__dirname}/../data`, 'rooms.json'),
        JSON.stringify(data),
        (err) => {
            if (err) throw Error(err.message)
            console.log(message)
        }
    )
}

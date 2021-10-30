const fs = require('fs')
const path = require('path')

module.exports = async function writeJsonData(data, message) {
    await fs.writeFile(
        path.join(`${__dirname}/../data`, 'rooms.json'),
        JSON.stringify(data),
        (err) => {
            if(err) throw Error(err.message)
            console.log(message)
        }
    )
}
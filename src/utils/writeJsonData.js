const path = require('path')
const fs = require('fs')

module.exports = function writeJsonData(data, message) {
  fs.writeFileSync(path.join(`${__dirname}/../store`, 'rooms.json'), JSON.stringify(data), (err) => {
    if (err) throw Error(err.message)
    console.log(message)
  })
}

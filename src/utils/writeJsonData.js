const path = require('path')
const fs = require('fs')

module.exports = function writeJsonData(fileName, data, message) {
  fs.writeFileSync(path.join(`${__dirname}/../store`, `${fileName}.json`), JSON.stringify(data), (err) => {
    if (err) throw Error(err.message)
    console.log(message)
  })
}

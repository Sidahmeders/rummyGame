const path = require('path')
const fs = require('fs')

module.exports = function readJsonData(fileName) {
  const jsonData = fs.readFileSync(path.join(`${__dirname}/../store`, `${fileName}.json`), 'utf8', (err, data) => {
    if (err) throw err
    return data
  })
  return jsonData
}

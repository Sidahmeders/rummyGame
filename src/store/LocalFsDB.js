const path = require('path')
const fs = require('fs')

class LocalFsDB {
  queryDB(fileName) {
    const jsonData = fs.readFileSync(path.join(`${__dirname}/../store`, `${fileName}.json`), 'utf8', (err, data) => {
      if (err) throw err
      return data
    })
    return jsonData
  }

  persistDB(fileName, data, message) {
    fs.writeFileSync(path.join(`${__dirname}/../store`, `${fileName}.json`), JSON.stringify(data), (err) => {
      if (err) throw Error(err.message)
      console.log(message)
    })
  }
}

module.exports = LocalFsDB

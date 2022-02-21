const path = require('path')
const fs = require('fs')

class LocalFsDB {
  fakeDb = {
    users: {
      testUser1: {
        id: 1,
        username: 'testUserName',
        socketId: '#44khsXefk!s&kd9',
        owendRoomsIds: ['testRoom', 'coolRoom'],
        hashPassword: 'pass123',
        onlineStatus: false,
      },
    },
    rooms: {
      testRoom1: {
        password: '1234',
        players: ['sodium', 'sidahmed'],
      },
    },
  }

  queryDB(fileName) {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(`${__dirname}`, `${fileName}.json`), 'utf8', (err, data) => {
        if (err) reject(err)
        else resolve(JSON.parse(data))
      })
    })
  }

  async persistDB(fileName, data, message) {
    await fs.writeFile(path.join(`${__dirname}`, `${fileName}.json`), JSON.stringify(data), (err) => {
      if (err) throw Error(err.message)
      console.log(message)
    })
  }
}

module.exports = LocalFsDB

const path = require('path')
const fs = require('fs')

class LocalFsDB {
  constructor(fakeDb) {
    this.fakeDb = fakeDb || {
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
      onlinePlayers: { '89DmrenV23#rm': { userName: 'testUser2', room: 'testRoom99' } },
    }
  }

  queryDB(fileName) {
    const jsonData = fs.readFileSync(path.join(`${__dirname}/store`, `${fileName}.json`), 'utf8', (err, data) => {
      if (err) throw err
      return data
    })
    return jsonData
  }

  persistDB(fileName, data, message) {
    fs.writeFileSync(path.join(`${__dirname}/store`, `${fileName}.json`), JSON.stringify(data), (err) => {
      if (err) throw Error(err.message)
      console.log(message)
    })
  }
}

module.exports = LocalFsDB

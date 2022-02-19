const LocalFsDB = require('../db/LocalFsDB.js')

class User extends LocalFsDB {
  constructor(user) {
    super()
    this.user = user
  }
}

module.exports = User

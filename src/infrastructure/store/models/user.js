const LocalFsDB = require('../../db/LocalFsDB')

class User extends LocalFsDB {
  constructor(user) {
    super()
    this.user = user
  }
}

module.exports = User

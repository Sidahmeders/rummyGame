const LocalFsDB = require('../db/LocalFsDB.js')

class User extends LocalFsDB {
  constructor(id, username, passwordHash) {
    this.id = id
    this.username = username
    this.passwordHash = passwordHash
    this.createdAt = createdAt
  }

  add(user) {
    this.persistDB('users', user, 'new user has been added...')
  }
}

module.exports = User

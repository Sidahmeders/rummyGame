const USER_ROLES = {
  vip: 'VIP',
  basic: 'BASIC',
  visitor: 'VISITOR',
}

module.exports = function buildMakeUser({ getUniqueId }) {
  return function makeUser({ id = getUniqueId(), email, passwordHash, displayName = '', isVerified = false, createdAt = Date.now(), role }) {
    if (!id) throw new Error('User must have an id')
    if (!email) throw new Error('User must have an email')
    if (!passwordHash) throw new Error('User must have a passwordHash')
    if (!Object.values(USER_ROLES).includes(role)) throw new Error('User must have a valid role')

    return Object.freeze({
      get id() {
        return id
      },
      get role() {
        return role
      },
      get email() {
        return email
      },
      get displayName() {
        return displayName
      },
      get description() {
        return description
      },
      get passwordHash() {
        return passwordHash
      },
      get isVerified() {
        return isVerified
      },
      get createdAt() {
        return createdAt
      },
      get isVip() {
        return role === USER_ROLES.vip
      },
      get isBasic() {
        return role === USER_ROLES.basic
      },
      get isVisitor() {
        return role === USER_ROLES.visitor
      },

      verify() {
        isVerified = true
      },
    })
  }
}

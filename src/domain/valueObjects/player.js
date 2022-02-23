module.exports = function Player({ cards = [], isOnline = false, turnToPick = false }) {
  return Object.freeze({
    get cards() {
      return cards
    },
    get isOnline() {
      return isOnline
    },
    get turnToPick() {
      return turnToPick
    },
  })
}

module.exports = class Player {
  constructor({ cards = [], isOnline = false, turnToPick = false }) {
    this.cards = cards
    this.isOnline = isOnline
    this.turnToPick = turnToPick
  }
}

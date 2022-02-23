module.exports = class Player {
  #cards
  #isOnline
  #turnToPick

  constructor({ cards = [], isOnline = false, turnToPick = false }) {
    this.#cards = cards
    this.#isOnline = isOnline
    this.#turnToPick = turnToPick
  }

  get cards() {
    return this.#cards
  }
  get isOnline() {
    return this.#isOnline
  }
  get turnToPick() {
    return this.#turnToPick
  }
}

module.exports = function createDeck(packetsCount = 1) {
  const finalDeck = ['Joker-1', 'Joker-2']

  let deckCounter = 0
  while (deckCounter++ < packetsCount) {
    const packet = composePacket()
    finalDeck.push(...packet)
  }
  return finalDeck
}

function composePacket() {
  const suits = ['H', 'C', 'D', 'S']
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
  const deck = []

  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push(`${suit}${rank}`)
    }
  }
  return deck
}

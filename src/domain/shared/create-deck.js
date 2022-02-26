module.exports = function createDeck(packetsCount = 1) {
  const finalDeck = ['Joker-1', 'Joker-2']

  let packetCounter = 0
  while (packetCounter++ < packetsCount) {
    const packet = composePacket(packetCounter)
    finalDeck.push(...packet)
  }
  return finalDeck
}

function composePacket(packetNumber) {
  const suits = ['H', 'C', 'D', 'S']
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
  const deck = []

  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push(`${suit}${rank}+${packetNumber}`)
    }
  }
  return deck
}

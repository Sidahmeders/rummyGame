function createDeck() {
  const suits = ['H', 'C', 'D', 'S']
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
  const deck = ['Joker-1', 'Joker-2']

  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push(`${suit}${rank}`)
    }
  }
  return deck
}

function shuffleTheDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    // get a random card from the deck
    let randomPosition = Math.floor(Math.random() * deck.length)
    const randomCard = deck[randomPosition]
    // swap the current card with the randomlly picked card
    deck[randomPosition] = deck[i]
    deck[i] = randomCard
  }
  return deck
}

module.exports = {
  createDeck,
  shuffleTheDeck,
}

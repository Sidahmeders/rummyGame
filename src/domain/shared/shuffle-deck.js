module.exports = function shuffleTheDeck(deck) {
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

export default function isValidSet(cards) {
  const validSetsMap = {}
  let cardIndex = -1

  while (cardIndex++ < cards.length - 1) {
    let card = cards[cardIndex]
    let [suit, rank] = [card[0], card[1]]

    console.warn(suit, rank, '>>>>>>>>')
  }

  return validSetsMap
}

// const suits = ['H', 'C', 'D', 'S']
// const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
// const deck = ['Joker-1', 'Joker-2']

/**
 * SA S2 S3 -> valid SeQuance
 * D2 D3 D4 -> valid SeQuance
 * C7 C8 C9 -> valid SeQuance
 * H6 H6 H6 -> valid Tunnela
 * S9 C9 D9 -> valid SET
 * D3 S3 H3 -> valid SET
 *
 * C2 CA JK -> valid SeQuance (Impure)
 * D6 D5 JK -> valid SeQuance (Impure)
 */

const setClassName = {
  invalid: 'invalid',
  pureSequance: 'pure-sequance',
  validTunnela: 'tunnela',
  validSet: 'valid-set',
}

function isValidSet(cards) {
  let isValidRank = true
  let prevRank
  let suitSet = new Set()

  for (let card of cards) {
    let [suit, rank] = [card[0], card[1]]
    if (rank === 'A') rank = '1'

    if (prevRank && prevRank != rank) isValidRank = false
    suitSet.add(suit)

    prevRank = rank
  }

  return isValidRank && suitSet.size === 3 ? setClassName.validSet : false
}

function isValidSequence(cards) {
  const validSequenceMap = {}
  let prevRank, prevSuit, startIndex
  let cardIndex = 0

  while (cardIndex++ < cards.length) {
    let card = cards[cardIndex]
    let [suit, rank] = [card[0], card[1]]

    if (prevRank && prevSuit) {
      if (suit === prevSuit && parseInt(rank) === parseInt(prevRank) + 1 && cardIndex - startIndex >= 3) {
        validSequenceMap[startIndex] = cards.slice(startIndex, cardIndex)
      } else startIndex = cardIndex
    }

    prevSuit = suit
    prevRank = rank
  }

  return validSequenceMap
}

function isValidTunnela(cards) {
  let prevoiusCard
  let isValidTunnela = true

  for (let currentCard of cards) {
    if (prevoiusCard && currentCard !== prevoiusCard) {
      isValidTunnela = false
    }
    prevoiusCard = currentCard
  }

  return isValidTunnela ? setClassName.validTunnela : false
}

const rummyMethods = [isValidTunnela, isValidSet, isValidSequence]

export default function suiteValidator(handSet, methods = rummyMethods) {
  if (typeof handSet !== 'object') return false
  for (let method of methods) {
    let result = method(handSet)
    if (result) return result
  }
  return setClassName.invalid
}

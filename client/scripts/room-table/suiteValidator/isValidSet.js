// ALPHA
export default function isValidSet(cards) {
  const validSetsMap = {}
  let prevRank,
    prevSuit,
    startIndex = 0,
    cardIndex = -1

  while (cardIndex++ < cards.length - 1) {
    let card = cards[cardIndex]
    let [suit, rank] = [card[0], card[1]]

    if (prevRank && prevSuit) {
      if (prevRank === rank && suit !== prevSuit) {
        if (cardIndex - startIndex >= 2) validSetsMap[startIndex] = cards.slice(startIndex, cardIndex + 1)
      } else startIndex = cardIndex
    }

    prevSuit = suit
    prevRank = rank
  }

  return validSetsMap
}

/*```
[Suit][Rank]
D => DIAMOND, H => HEART, S => SPADE, C => CLOVER

0) D6 + S6 + H6 = valid
1) D2 + H2 + S2 + C2 = ?? valid : not

2) DJ + SQ + HK = ?? not : valid
3) D10 + HJ + SQ = ?? not : valid
4) S10 + H10 + SJ + HQ = ?? not : valid
```*/

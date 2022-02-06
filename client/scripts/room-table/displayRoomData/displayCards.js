import createHandSet from '../createHandSet.js'

export default function displayCards(playerCards) {
  const { username } = window.getRoomInfo()
  const playerElement = document.getElementsByClassName(`player ${username}`)
  const handSets = splitCards(playerCards)

  for (let handSet of handSets) {
    const handSetElement = createHandSet(handSet)
    playerElement[0].appendChild(handSetElement)
  }
}

function splitCards(cards) {
  let subArrays = []
  let k = 0
  while (cards.length) {
    subArrays[k] = []
    let j = 0
    while (j < 3 && cards.length) {
      subArrays[k][j] = cards.pop()
      j++
    }
    k++
  }
  return subArrays
}

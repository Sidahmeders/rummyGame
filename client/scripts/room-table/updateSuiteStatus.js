import suiteValidator from './suiteValidator/index.js'

export default async function updateSuitesStatus() {
  const playerCards = document.getElementById('player').childNodes
  const playerCardsClasses = extractPlayerCardsClasses(playerCards)

  const suitesMap = suiteValidator(playerCardsClasses)

  suitesMap.forEach((suite) => {
    for (let key in suite) {
      let validSuite = suite[key]
      for (let cardClass of validSuite) {
        const cardElement = document.getElementsByClassName(`player-card ${cardClass}`)[0]
        cardElement.innerHTML = '<span></span>'
      }
    }
  })
}

function extractPlayerCardsClasses(playerCards) {
  const playerCardsClasses = []
  playerCards.forEach((node) => {
    node.innerHTML = '' // reset the cards status
    const cardClassList = node.classList
    const cardClass = cardClassList[cardClassList.length - 1]
    playerCardsClasses.push(cardClass)
  })
  return playerCardsClasses
}

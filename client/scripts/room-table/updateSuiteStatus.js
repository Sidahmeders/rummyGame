import { getPlayerCards } from './utils.js'
import suiteValidator from './suiteValidator/index.js'

export default async function updateSuitesStatus() {
  resetPlayerCardsStatus()
  const playerCardsClasses = getPlayerCards()
  const suitesMap = suiteValidator(playerCardsClasses)
  setPlayerCardsStatus(suitesMap)
}

function resetPlayerCardsStatus() {
  const cardsNodes = document.getElementById('player').childNodes
  cardsNodes.forEach((cardElement) => cardsFlag.removeValidFlag(cardElement))
}

function setPlayerCardsStatus(suitesMap) {
  suitesMap.forEach((suite) => {
    for (let key in suite) {
      let validSuite = suite[key]
      for (let cardClass of validSuite) {
        const cardElement = document.getElementsByClassName(`player-card ${cardClass}`)[0]
        cardsFlag.addValidFlag(cardElement)
      }
    }
  })
}

const cardsFlag = {
  addValidFlag: (cardElement) => (cardElement.innerHTML = '<span></span>'),
  removeValidFlag: (cardElement) => (cardElement.innerHTML = ''),
}

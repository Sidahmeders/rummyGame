import suiteValidator from './suiteValidator'

export default async function updateSuitesStatus(playerCardsClasses) {
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

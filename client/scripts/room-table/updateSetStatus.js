import suiteValidator from './suiteValidator.js'

export default async function updateSetStatus(suiteContainer) {
  const handSet = await extarctHandSet(suiteContainer)
  const oldSetClass = suiteContainer.classList[1]
  const newSetClass = suiteValidator(handSet)
  suiteContainer.classList.replace(oldSetClass, newSetClass)
}

function extarctHandSet(suiteContainer) {
  const nodeSetCards = suiteContainer.childNodes
  const handSet = []

  return new Promise((reslove) => {
    setTimeout(() => {
      for (let card of nodeSetCards) {
        const cardIndex = card.classList.length - 1
        handSet.push(card.classList[cardIndex])
        reslove(handSet)
      }
    }, 5)
  })
}

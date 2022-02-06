import suiteValidator from './suiteValidator.js'

export default async function updateSetStatus(nodeSetContainer) {
  const handSet = await extarctHandSet(nodeSetContainer)
  const oldSetClass = nodeSetContainer.classList[1]
  const newSetClass = suiteValidator(handSet)
  nodeSetContainer.classList.replace(oldSetClass, newSetClass)
}

function extarctHandSet(nodeSetContainer) {
  const nodeSetCards = nodeSetContainer.childNodes
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

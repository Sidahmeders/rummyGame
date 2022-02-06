import suiteValidator from './suiteValidator.js'

export default async function updateSetStatus(cartsContainer) {
  const handSet = await extarctHandSet(cartsContainer)
  const oldSetClass = cartsContainer.classList[1]
  const newSetClass = suiteValidator(handSet)
  cartsContainer.classList.replace(oldSetClass, newSetClass)
}

function extarctHandSet(cartsContainer) {
  const setElement = cartsContainer.childNodes
  const handSet = []

  return new Promise((reslove) => {
    setTimeout(() => {
      for (let card of setElement) {
        const cardIndex = card.classList.length - 1
        handSet.push(card.classList[cardIndex])
        reslove(handSet)
      }
    }, 5)
  })
}

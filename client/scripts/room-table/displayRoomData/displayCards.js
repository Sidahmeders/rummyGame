import addDragableEvents from '../addDragableEvents.js'
// import suiteValidator from '../suiteValidator/index.js'

export default function displayCards(playerCards) {
  const playerElement = document.getElementById('player')

  createHandCards(playerCards, playerElement)
}

function createHandCards(playerCards, playerElement) {
  for (let card of playerCards) {
    const cardElement = document.createElement('div')
    cardElement.className = `player-card ${card}`
    cardElement.setAttribute('draggable', true)
    addDragableEvents(cardElement)

    playerElement.appendChild(cardElement)
  }
}

// function createHandSet(playerCards, playerElement) {
//   const handSets = splitCards(playerCards)

//   for (let handSet of handSets) {
//     const handSetElement = document.createElement('div')
//     const handSetClass = suiteValidator(handSet)
//     handSetElement.classList.add('hand-set', handSetClass)

//     handSet.forEach((card) => {
//       const cardElement = document.createElement('div')
//       cardElement.classList.add('player-card', card)
//       cardElement.setAttribute('draggable', true)
//       addDragableEvents(cardElement)
//       handSetElement.append(cardElement)
//     })

//     playerElement.appendChild(handSetElement)
//   }
// }

// function splitCards(cards) {
//   let subArrays = []
//   let k = 0
//   while (cards.length) {
//     subArrays[k] = []
//     let j = 0
//     while (j < 3 && cards.length) {
//       subArrays[k][j] = cards.pop()
//       j++
//     }
//     k++
//   }
//   return subArrays
// }

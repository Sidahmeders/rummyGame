import arrangeCards from '../arrangeCards.js'
import getRoomInfo from '../../../utils/getRoomInfo.js'
import handSetValidator from '../validateSets.js'

export default function displayCards(playersCards) {
    const { username } = getRoomInfo()
    for (let playerName in playersCards) {
        if (playerName === username) {
            const playerHand = playersCards[playerName]
            appendPlayerCards(playerName, playerHand)
        }
    }
}

function appendPlayerCards(playerName, playerHand) {
    const playerElement = document.getElementsByClassName(`player ${playerName}`)
    const handSets = splitCards(playerHand)

    for (let handSet of handSets) {
        const handSetElement = createHandSet(handSet)
        playerElement[0].appendChild(handSetElement)
    }
}

function createHandSet(handSet) {
    const handSetElement = document.createElement('div')
    const setClassName = handSetValidator(handSet)
    handSetElement.classList.add('hand-set', setClassName)

    handSet.forEach((card) => {
        const cardElement = document.createElement('div')
        cardElement.classList.add('player-card', card)
        cardElement.setAttribute('draggable', true)
        arrangeCards(cardElement)
        handSetElement.append(cardElement)
    })
    return handSetElement
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

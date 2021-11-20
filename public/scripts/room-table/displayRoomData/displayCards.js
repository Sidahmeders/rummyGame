import getRoomInfo from '../../../utils/getRoomInfo.js'
import createHandSet from '../createHandSet.js'

export default function displayCards(playersCards) {
    const { username } = getRoomInfo()
    for (let playerName in playersCards) {
        if (playerName === username) {
            const playerHand = playersCards[playerName]
            appendPlayerCards(playerName, playerHand)
        } else {
            appendOpponentCards(playerName)
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

function appendOpponentCards(playerName) {
    const playerElement = document.getElementsByClassName(`player ${playerName}`)
    playerElement[0].style.width = '30vw'
    for (let i = 0; i < 8; i++) {
        const cardElement = document.createElement('div')
        cardElement.classList.add('player-card', 'x-card')
        playerElement[0].appendChild(cardElement)
    }
}

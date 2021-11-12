import arrangeCards from '../arrangeCards.js'
import getRoomInfo from '../../../utils/getRoomInfo.js'

export default function displayCards(playersCards) {
    const { username } = getRoomInfo()

    for (let playerName in playersCards) {
        const playerElement = document.getElementsByClassName(`player ${playerName}`)
        const playerHand = playersCards[playerName]
        const isTargetPlayer = playerName === username

        playerHand.forEach((card) => {
            removeDuplicateCards(card)
            const cardElement = document.createElement('div')
            cardElement.classList.add('player-card', isTargetPlayer ? card : 'x-card')
            if (isTargetPlayer) {
                cardElement.setAttribute('draggable', true)
                arrangeCards(cardElement)
            }
            playerElement[0].appendChild(cardElement)
        })
    }
}

function removeDuplicateCards(card) {
    const playerElements = document.getElementsByClassName(`${card}`)
    for (let item of playerElements) {
        item.remove()
    }
}

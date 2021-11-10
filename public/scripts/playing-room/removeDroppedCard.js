import getRoomInfo from '../../utils/getRoomInfo.js'
const { username } = getRoomInfo()

export default function removeDroppedCard(playersCards) {
    const oldCardsList = getPlayerCardsList(playersCards)
    const newCardsList = playersCards[username]

    console.log(oldCardsList, newCardsList)

    const targetCard = getTargetCard(oldCardsList, newCardsList)
    console.log(targetCard, 'Target Card')

    removeTargetCard(targetCard)
}

function getPlayerCardsList(playersCards) {
    const cardsList = []
    for (let playerName in playersCards) {
        if (playerName === username) {
            const playerElement = document.getElementsByClassName(`player ${playerName}`)
            const childNodes = playerElement[0].childNodes

            for (let i = 1; i < childNodes.length; i++) {
                let node = childNodes[i]
                const nodeClass = node.classList[1]
                cardsList.push(nodeClass)
            }
        }
    }

    return cardsList
}

function getTargetCard(oldCardsList, newCardsList) {
    for (let oldCard of oldCardsList) {
        if (newCardsList.indexOf(oldCard) === -1) {
            return oldCard
        }
    }
    return undefined
}

function removeTargetCard(targetCard) {
    const playerCardElement = document.getElementsByClassName(`${targetCard}`)
    playerCardElement[0].remove()
}

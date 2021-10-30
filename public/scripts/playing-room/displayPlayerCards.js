import handleCardsArrangement from "./handleCardsArrangement.js"

export default function displayPlayerCards(playersCards) {
    for (let username in playersCards) {
        const playerElement = document.getElementsByClassName(`player ${username}`)
        const playerHand = playersCards[username]
        
        playerHand.forEach(card => {
            removeDuplicateCards(card)
            const cardElement = document.createElement('div')
            cardElement.classList.add('player-card', card)
            cardElement.setAttribute('draggable', true)
            handleCardsArrangement(cardElement)
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
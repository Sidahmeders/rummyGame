
export default function displayPlayerCards(playersCards) {
    for (let username in playersCards) {
        const playerElement = document.getElementsByClassName(`player ${username}`)
        const playerHand = playersCards[username]
        
        playerHand.forEach(card => {
            removePlayerCards(card)
            const cardElement = document.createElement('div')
            cardElement.classList.add('player-card', card)
            playerElement[0].appendChild(cardElement)
        })
    }
}

function removePlayerCards(card) {
    const playerElements = document.getElementsByClassName(`${card}`)
    for (let item of playerElements) {
        item.remove()
    }
}
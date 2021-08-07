import handleCardsDeckUI from './cardsDeckUi.js'

document.addEventListener('DOMContentLoaded', fetchPlayingData)

async function fetchPlayingData() {
    const roomName = location.href.split('/')[4]
    let response = await fetch(`http://localhost:5000/room-data?roomName=${roomName}`)
    response = await response.json()

    const { data, error } = response
    if (data) {
        handleSuccessfullFetch(data)
    } else {
        console.log(error)
    }
}

function handleSuccessfullFetch(data) {
    const tableElement = document.getElementById('table')
    const { players, cards, playersCards } = data
    console.log(data) // DATA LOGGING
    
    players.map(player => {
        const playerElement = document.createElement('div')
        playerElement.classList.add('player', player)
        playerElement.innerHTML = `<p class="username"> ${player} </p>`
        tableElement.appendChild(playerElement)
    })

    handleCardsDeckUI(cards)
    displayPlayerCards(playersCards)
}

function displayPlayerCards(playersCards) {
    for (let username in playersCards) {
        const playerElement = document.getElementsByClassName(`player ${username}`)
        const playerHand = playersCards[username]

        playerHand.forEach(card => {
            const cardElement = document.createElement('div')
            cardElement.classList.add('player-card', card)
            playerElement[0].appendChild(cardElement)
        })

    }
}

const socket2 = io()
socket2.on('deck-changed', (updatedDeck) => {
    console.log(updatedDeck, "DECK CHANGED") // DATA LOGGING
})

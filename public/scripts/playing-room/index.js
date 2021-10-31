import handleCardsDeckUI from './handleCardsDeckUI.js'
import displayPlayerCards from './displayPlayerCards.js'

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

    players.map((player) => {
        const playerElement = document.createElement('div')
        playerElement.classList.add('player', player)
        playerElement.innerHTML = `<p class="username"> ${player} </p>`
        tableElement.appendChild(playerElement)
    })

    handleCardsDeckUI(cards)
    displayPlayerCards(playersCards)
}

io().on('deck-changed', (updatedDeck) => {
    console.log(updatedDeck, 'DECK CHANGED') // DATA LOGGING
    handleCardsDeckUI(updatedDeck.cards)
    displayPlayerCards(updatedDeck.playersCards)
})

io().on('room-error', (error) => console.log(error))

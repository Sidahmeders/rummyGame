
const socket2 = io()

document.addEventListener('DOMContentLoaded', fetchPlayingData)
let roomName = location.href.split('/')[4]

async function fetchPlayingData() {    
    let response = await fetch(`http://localhost:5000/room-data?roomName=${roomName}`)
    response = await response.json()

    const { data, error } = response

    if (data) {
        const tableElement = document.getElementById('table')
        const { players, cards } = data
        console.log(data) // DATA LOGGING
        players.map(player => {
            const playerElement = document.createElement('h3')
            playerElement.innerText = player
            
            tableElement.appendChild(playerElement)
        })

        handleCardsUI(cards)
    } else {
        console.log(error)
    }
}

function handleCardsUI(cards) {
    cards.push('hidden') // push the hidden card on top of the deck
    const cardsElement = document.getElementById('cards')

    cards.forEach(card => {
        const cardElement = document.createElement('div')
        cardElement.classList.add('card', card)
        if (card === 'hidden') {
            cardElement.onclick = dragCardsFromTheDeck.bind(cards)
        }
        cardsElement.appendChild(cardElement)
    })
}

function dragCardsFromTheDeck() {
    const cards = this.filter(card => card !== 'hidden')
    socket2.emit('player-drags-card', roomName, 'username', cards[0])
    console.log(cards)
}

socket2.on('deck-chamged', (updatedDeck) => {
    console.log(updatedDeck)
})

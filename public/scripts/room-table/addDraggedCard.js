import getRoomInfo from '../../utils/getRoomInfo.js'
import getPlayerCardsList from '../../utils/getPlayerCardsList.js'
import getTargetCard from '../../utils/getTargetCard.js'
import arrangeCards from './arrangeCards.js'

const { username } = getRoomInfo()

export default function addDraggedCard({ playersCards }) {
    const newCardsList = getPlayerCardsList(playersCards, username)
    const oldCardsList = playersCards[username]
    const targetCard = getTargetCard(oldCardsList, newCardsList)

    if (targetCard) {
        const cardElement = document.createElement('div')
        cardElement.classList.add('player-card', targetCard)
        cardElement.setAttribute('draggable', true)
        arrangeCards(cardElement)

        const playerElement = document.getElementsByClassName(`player ${username}`)
        playerElement[0].appendChild(cardElement)
    }
}

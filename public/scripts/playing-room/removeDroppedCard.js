import getRoomInfo from '../../utils/getRoomInfo.js'
import getPlayerCardsList from '../../utils/getPlayerCardsList.js'
import getTargetCard from '../../utils/getTargetCard.js'

const { username } = getRoomInfo()

export default function removeDroppedCard(playersCards) {
    const oldCardsList = getPlayerCardsList(playersCards, username)
    const newCardsList = playersCards[username]

    console.log(oldCardsList, newCardsList)

    const targetCard = getTargetCard(oldCardsList, newCardsList)
    console.log(targetCard, 'Target Card')

    removeTargetCard(targetCard)
}

function removeTargetCard(targetCard) {
    const playerCardElement = document.getElementsByClassName(`${targetCard}`)
    playerCardElement[0].remove()
}

import getRoomInfo from '../../../utils/getRoomInfo.js'
import getTargetCard from '../../../utils/getTargetCard.js'
import getPlayerCardsList from '../../../utils/getPlayerCardsList.js'

const { username } = getRoomInfo()

export default function removeDroppedCard({ playersCards }) {
    const oldCardsList = getPlayerCardsList(playersCards, username)
    const newCardsList = playersCards[username]

    const targetCard = getTargetCard(oldCardsList, newCardsList)
    if (targetCard) {
        document.getElementsByClassName(`${targetCard}`)[0].remove()
    }
}

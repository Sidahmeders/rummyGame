export default function getPlayerCardsList(playersCards, username) {
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

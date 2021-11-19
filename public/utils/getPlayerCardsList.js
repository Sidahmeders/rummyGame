export default function getPlayerCardsList(playersCards, username) {
    const cardsList = []
    for (let playerName in playersCards) {
        if (playerName === username) {
            const playerElement = document.getElementsByClassName(`player ${playerName}`)
            const setsNodes = playerElement[0].childNodes

            for (let k = 1; k < setsNodes.length; k++) {
                let setNodeList = setsNodes[k].childNodes
                for (let node of setNodeList) {
                    const nodeClass = node.classList[1]
                    cardsList.push(nodeClass)
                }
            }
        }
    }
    return cardsList
}

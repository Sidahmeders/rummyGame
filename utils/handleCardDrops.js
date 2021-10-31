module.exports = function handleCardDrops() {
    return false
}

function dropCardFromPlayersDeck(username, selectedCard, targetRoom) {
    const { playersCards } = targetRoom
    let playerHand = playersCards[username]
    playerHand = playerHand.filter((card) => card !== selectedCard)
    targetRoom[username] = playerHand
}

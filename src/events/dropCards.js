const getPlayerData = require('../utils/getPlayerData.js')
const inMemoryActiveGames = require('../store/inMemoryGames')

module.exports = ({ socket, payload, events }) => {
  try {
    const { username, roomName, pickedCardClass } = payload
    const targetRoom = inMemoryActiveGames[roomName]
    if (!targetRoom) throw Error('something unexpected happens. please refresh the page')

    const { playersCards } = targetRoom
    let playerHand = playersCards[username]
    if (playerHand.length <= 14) throw Error('make sure you have picked a card before you can drop')

    playerHand = playerHand.filter((card) => card !== pickedCardClass)
    targetRoom.playersCards[username] = playerHand

    const userData = getPlayerData(username, roomName)
    socket.emit(events.cardsDropped, userData)
  } catch (err) {
    socket.emit(events.roomsError, err.message)
  }
}

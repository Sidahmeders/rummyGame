const InMemoryGames = require('../../infrastructure/store/InMemoryGames')
const { getPlayerRoomData } = require('../../domain/services')

module.exports = ({ socket, payload, events }) => {
  try {
    const { username, roomName, pickedCardClass } = payload
    const targetRoom = InMemoryGames[roomName]
    if (!targetRoom) throw Error('something unexpected happens. please refresh the page')

    const { playersCards } = targetRoom
    let playerHand = playersCards[username]
    if (playerHand.length <= 14) throw Error('make sure you have picked a card before you can drop')

    playerHand = playerHand.filter((card) => card !== pickedCardClass)
    targetRoom.playersCards[username] = playerHand

    const userData = getPlayerRoomData(roomName, username)
    socket.emit(events.cardsDropped, userData)
  } catch (err) {
    socket.emit(events.roomsError, err.message)
  }
}

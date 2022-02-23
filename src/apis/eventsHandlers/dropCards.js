const { InMemoryGames } = require('../../infrastructure/store')
const { getPlayerRoomData } = require('../../domain/services')

module.exports = ({ payload, wsEventEmitter, events }) => {
  try {
    const { username, roomName, pickedCardClass } = payload
    const targetRoom = InMemoryGames.getRoomData(roomName) // FIXME: REMOVE InMemoryGames as dependency
    if (!targetRoom) throw Error('something unexpected happens. please refresh the page')

    const { players } = targetRoom
    let playerHand = players[username]?.cards
    if (playerHand.length <= 14) throw Error('make sure you have picked a card before you can drop')

    playerHand = playerHand.filter((card) => card !== pickedCardClass)
    players[username].cards = playerHand

    console.log(targetRoom.players[username].cards)

    const userData = getPlayerRoomData(roomName, username)
    wsEventEmitter.emit(events.cardsDropped, userData)
  } catch (err) {
    wsEventEmitter.emit(events.roomsError, err.message)
    console.error(err)
  }
}

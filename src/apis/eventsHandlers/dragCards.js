const { InMemoryGames } = require('../../infrastructure/store')
const { getPlayerRoomData } = require('../../domain/services')

module.exports = ({ payload, wsEventEmitter, events }) => {
  try {
    const { roomName, username } = payload
    const targetRoom = InMemoryGames.getRoomData(roomName) // FIXME: REMOVE InMemoryGames as dependency
    if (!targetRoom) throw Error('something unexpected happens. please refresh the page')

    const { cards, playersCards } = targetRoom

    const pickedCard = cards.pop()
    const playerHand = playersCards[username]

    if (playerHand.length >= 15) throw Error('please drop a card before you can pick again')
    if (!pickedCard) throw Error('the cards deck is empty')

    playerHand.push(pickedCard)
    const playerData = getPlayerRoomData(roomName, username)
    wsEventEmitter.emit(events.cardsDragged, playerData)
  } catch (err) {
    wsEventEmitter.emit(events.roomsError, err.message)
    console.error(err)
  }
}

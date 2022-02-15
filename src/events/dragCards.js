const store = require('../store')

module.exports = ({ socket, payload, events }) => {
  try {
    const { roomName, username } = payload
    const targetRoom = store.getRoomByName(roomName)
    if (!targetRoom) throw Error('something unexpected happens. please refresh the page')

    const { cards, playersCards } = targetRoom

    const pickedCard = cards.pop()
    const playerHand = playersCards[username]

    if (playerHand.length >= 15) throw Error('please drop a card before you can pick again')
    if (!pickedCard) throw Error('the cards deck is empty')

    playerHand.push(pickedCard)
    const playerData = store.getPlayerRoomData(roomName, username)
    socket.emit(events.cardsDragged, playerData)
  } catch (err) {
    socket.emit(events.roomsError, err.message)
  }
}

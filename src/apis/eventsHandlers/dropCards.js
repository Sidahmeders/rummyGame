const { dropCard, getPlayerRoomData } = require('../../domain/services')

module.exports = ({ wsEventEmitter, events }) => {
  return (payload) => {
    try {
      const { username, roomName, pickedCardClass } = payload
      dropCard(roomName, username, pickedCardClass)
      const userData = getPlayerRoomData(roomName, username)
      wsEventEmitter.emit(events.cardsDropped, userData)
    } catch (err) {
      wsEventEmitter.emit(events.roomsError, err.message)
      console.error(err)
    }
  }
}

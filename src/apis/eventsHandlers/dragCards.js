const { dragCard, getPlayerRoomData } = require('../../domain/services')

module.exports = ({ payload, wsEventEmitter, events }) => {
  try {
    const { roomName, username } = payload

    dragCard(roomName, username)

    const playerData = getPlayerRoomData(roomName, username)
    wsEventEmitter.emit(events.cardsDragged, playerData)
  } catch (err) {
    wsEventEmitter.emit(events.roomsError, err.message)
    console.error(err)
  }
}

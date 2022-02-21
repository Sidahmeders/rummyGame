module.exports = ({ wsEventEmitter, events }) => {
  return {
    onPeerJoin: (room) => {
      const clientsInRoom = wsEventEmitter.getSocketRooms(room)
      const numClients = clientsInRoom ? clientsInRoom.size : 0
      const socketID = wsEventEmitter.socket.id
      const payload = JSON.stringify({ socketID, numClients })

      wsEventEmitter.emit(events.peersJoined, payload)
    },
    onPeerMessage: (message) => {
      const { room, payload } = JSON.parse(message)
      const event = payload?.type

      wsEventEmitter.broadcastToRoom(room, event, payload)
    },
  }
}

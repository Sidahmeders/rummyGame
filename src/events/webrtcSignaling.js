module.exports = ({ socket, events }) => {
  return {
    onPeerJoin: (room) => {
      const clientsInRoom = socket.adapter.rooms.get(room)
      const numClients = clientsInRoom ? clientsInRoom.size : 0
      const payload = JSON.stringify({ socketID: socket.id, numClients })

      socket.emit(events.peersJoined, payload)
    },
    onPeerMessage: (message) => {
      const { room, payload } = JSON.parse(message)
      const event = payload?.type

      socket.to(room).emit(event, payload)
    },
  }
}

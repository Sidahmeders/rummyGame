module.exports = function handleWebRtcSignaling({ socket }) {
  return {
    onPeerMessage: (message) => {
      const { room, payload } = JSON.parse(message)
      const event = payload?.type

      socket.to(room).emit(event, payload)
    },
    onPeerJoin: () => {
      const clientsInRoom = socket.adapter.rooms.get(room)
      const numClients = clientsInRoom ? clientsInRoom.size : 0
      const payload = JSON.stringify({ socketID: socket.id, numClients })

      socket.join(room)
      socket.emit('peer-joined', payload)
    },
  }
}
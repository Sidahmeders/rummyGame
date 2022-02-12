const { joinRoom, dragCards, dropCards, getRoomData, peerJoin, peerMessage } = require('../events')

const onConnection = (io, socket) => {
  console.log(`user:: ${socket.id} ::connected`)

  socket.on('join-room', (payload) => joinRoom(io, socket, payload))
  socket.on('get-room-data', (payload) => getRoomData(io, socket, payload))

  socket.on('drag-card', (payload) => dragCards(io, socket, payload))
  socket.on('drop-card', (payload) => dropCards(io, socket, payload))

  socket.on('peer-join', (payload) => peerJoin(io, socket, payload))
  socket.on('peer-message', (payload) => peerMessage(io, socket, payload))

  socket.on('disconnect', () => console.log(`A user ${socket.id} disconnected`))
}

module.exports = (io) => io.on('connection', (socket) => onConnection(io, socket))

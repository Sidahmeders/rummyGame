const { joinRoom, dragCards, dropCards, getRoomData, peerJoin, peerMessage } = require('../events')

const onConnection = (io, socket) => {
  console.log(`user:: ${socket.id} ::connected`)

  socket.on('rooms:join', (payload) => joinRoom(io, socket, payload))
  socket.on('rooms:data', (payload) => getRoomData(io, socket, payload))

  socket.on('cards:drag', (payload) => dragCards(io, socket, payload))
  socket.on('cards:drop', (payload) => dropCards(io, socket, payload))

  socket.on('peers:join', (payload) => peerJoin(io, socket, payload))
  socket.on('peers:message', (payload) => peerMessage(io, socket, payload))

  socket.on('disconnect', () => console.log(`user:: ${socket.id} ::disconnected`))
}

module.exports = (io) => io.on('connection', (socket) => onConnection(io, socket))

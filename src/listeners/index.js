const listners = require('../constant/listeners')
const { joinRoom, dragCards, dropCards, getRoomData, peerJoin, peerMessage } = require('../events')

const onConnection = (io, socket) => {
  console.log(`user:: ${socket.id} ::connected`)

  socket.on(listners.joinRoom, (payload) => joinRoom(io, socket, payload))
  socket.on(listners.roomsData, (payload) => getRoomData(io, socket, payload))

  socket.on(listners.cardsDrag, (payload) => dragCards(io, socket, payload))
  socket.on(listners.cardsDrop, (payload) => dropCards(io, socket, payload))

  socket.on(listners.peersJoin, (payload) => peerJoin(io, socket, payload))
  socket.on(listners.peersMessage, (payload) => peerMessage(io, socket, payload))

  socket.on(listners.disconnect, () => console.log(`user:: ${socket.id} ::disconnected`))
}

module.exports = (io) => io.on('connection', (socket) => onConnection(io, socket))

const listners = require('../constant/listeners')
const eventHandlers = require('../events')

const onConnection = (io, socket) => {
  const { joinRoom, dragCards, dropCards, getRoomData, peerJoin, peerMessage } = eventHandlers(io, socket)

  console.log(`user:: ${socket.id} ::connected`)

  socket.on(listners.joinRoom, joinRoom)
  socket.on(listners.roomsData, getRoomData)

  socket.on(listners.cardsDrag, dragCards)
  socket.on(listners.cardsDrop, dropCards)

  socket.on(listners.peersJoin, peerJoin)
  socket.on(listners.peersMessage, peerMessage)

  socket.on(listners.disconnect, () => console.log(`user:: ${socket.id} ::disconnected`))
}

module.exports = (io) => io.on('connection', (socket) => onConnection(io, socket))

const listners = require('../../constant/listeners')
const eventHandlers = require('../../apis/eventsHandlers')

const onConnection = (io, socket) => {
  const { connection, disconnect, joinRoom, dragCards, dropCards, getRoomData, peerJoin, peerMessage } = eventHandlers(io, socket)
  connection()

  socket.on(listners.joinRoom, joinRoom)
  socket.on(listners.roomsData, getRoomData)
  socket.on(listners.cardsDrag, dragCards)
  socket.on(listners.cardsDrop, dropCards)

  socket.on(listners.peersJoin, peerJoin)
  socket.on(listners.peersMessage, peerMessage)

  socket.on(listners.disconnect, disconnect)
}

module.exports = (io) => io.on('connection', (socket) => onConnection(io, socket))

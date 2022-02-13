const events = require('../constant/events')
const makeConnect = require('./connection')
const makeDisConnect = require('./disconnect.js')
const makeJoinRoom = require('./joinRoom.js')
const makeGetRoomData = require('./getRoomData.js')
const makeDragCards = require('./dragCards.js')
const makeDropCards = require('./dropCards.js')
const makeWebrtcSignaling = require('./webrtcSignaling.js')

module.exports = (io, socket) => {
  const connection = () => makeConnect(socket)
  const disconnect = () => makeDisConnect(socket)

  const joinRoom = (payload) => makeJoinRoom({ socket, payload, events })
  const getRoomData = (payload) => makeGetRoomData({ io, socket, payload, events })
  const dragCards = (payload) => makeDragCards({ socket, payload, events })
  const dropCards = (payload) => makeDropCards({ socket, payload, events })

  const webrtcSignal = makeWebrtcSignaling({ socket, events })
  const peerJoin = (room) => webrtcSignal.onPeerJoin(room)
  const peerMessage = (message) => webrtcSignal.onPeerMessage(message)

  return { connection, disconnect, joinRoom, getRoomData, dragCards, dropCards, peerJoin, peerMessage }
}

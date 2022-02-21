const events = require('../../constant/events')
const makeConnect = require('./connection')
const makeDisConnect = require('./disconnect.js')
const makeJoinRoom = require('./joinRoom.js')
const makeGetRoomData = require('./getRoomData.js')
const makeDragCards = require('./dragCards.js')
const makeDropCards = require('./dropCards.js')
const makeWebrtcSignaling = require('./webrtcSignaling.js')

module.exports = (wsEventEmitter) => {
  const connection = () => makeConnect(wsEventEmitter)
  const disconnect = () => makeDisConnect({ wsEventEmitter, events })

  const joinRoom = (payload) => makeJoinRoom({ payload, wsEventEmitter, events })
  const getRoomData = (payload) => makeGetRoomData({ payload, wsEventEmitter, events })
  const dragCards = (payload) => makeDragCards({ payload, wsEventEmitter, events })
  const dropCards = (payload) => makeDropCards({ payload, wsEventEmitter, events })

  const webrtcSignal = makeWebrtcSignaling({ wsEventEmitter, events })
  const peerJoin = (room) => webrtcSignal.onPeerJoin(room)
  const peerMessage = (message) => webrtcSignal.onPeerMessage(message)

  return { connection, disconnect, joinRoom, getRoomData, dragCards, dropCards, peerJoin, peerMessage }
}

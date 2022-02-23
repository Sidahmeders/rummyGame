const events = require('../../constant/events')
const makeConnect = require('./connection')
const makeDisConnect = require('./disconnect.js')
const makeJoinRoom = require('./joinRoom.js')
const makeGetRoomData = require('./getRoomData.js')
const makeDragCards = require('./dragCards.js')
const makeDropCards = require('./dropCards.js')
const makeWebrtcSignaling = require('./webrtcSignaling.js')

module.exports = (wsEventEmitter) => {
  const connection = makeConnect({ wsEventEmitter })
  const disconnect = makeDisConnect({ wsEventEmitter, events })

  const joinRoom = makeJoinRoom({ wsEventEmitter, events })
  const getRoomData = makeGetRoomData({ wsEventEmitter, events })
  const dragCards = makeDragCards({ wsEventEmitter, events })
  const dropCards = makeDropCards({ wsEventEmitter, events })

  const { peerJoin, peerMessage } = makeWebrtcSignaling({ wsEventEmitter, events })

  return { connection, disconnect, joinRoom, getRoomData, dragCards, dropCards, peerJoin, peerMessage }
}

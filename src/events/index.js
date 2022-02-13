const events = require('../constant/events')
const makeJoinRoom = require('./joinRoom.js')
const makeGetRoomData = require('./getRoomData.js')
const makeDragCards = require('./dragCards.js')
const makeDropCards = require('./dropCards.js')
const makeWebrtcSignaling = require('./webrtcSignaling.js')

const joinRoom = (io, socket, payload) => makeJoinRoom({ socket, payload, events })
const getRoomData = (io, socket, payload) => makeGetRoomData({ io, socket, payload, events })
const dragCards = (io, socket, payload) => makeDragCards({ socket, payload, events })
const dropCards = (io, socket, payload) => makeDropCards({ socket, payload, events })

const peerJoin = (io, socket, room) => makeWebrtcSignaling({ socket, events }).onPeerJoin(room)
const peerMessage = (io, socket, message) => makeWebrtcSignaling({ socket, events }).onPeerMessage(message)

module.exports = { joinRoom, getRoomData, dragCards, dropCards, peerJoin, peerMessage }

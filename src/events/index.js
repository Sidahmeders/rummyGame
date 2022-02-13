const makeJoinRoom = require('./joinRoom.js')
const makeGetRoomData = require('./getRoomData.js')
const makeDragCards = require('./dragCards.js')
const makeDropCards = require('./dropCards.js')
const makeWebrtcSignaling = require('./webrtcSignaling.js')

const joinRoom = (io, socket, payload) => makeJoinRoom(io, socket, payload)
const getRoomData = (io, socket, payload) => makeGetRoomData(io, socket, payload)
const dragCards = (io, socket, payload) => makeDragCards(io, socket, payload)
const dropCards = (io, socket, payload) => makeDropCards(io, socket, payload)

const peerJoin = (io, socket, room) => makeWebrtcSignaling({ socket }).onPeerJoin(room)
const peerMessage = (io, socket, message) => makeWebrtcSignaling({ socket }).onPeerMessage(message)

module.exports = { joinRoom, getRoomData, dragCards, dropCards, peerJoin, peerMessage }

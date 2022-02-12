const make_joinRoom = require('./joinRoom.js')
const makeGetRoomData = require('./getRoomData.js')
const makeDragCards = require('./dragCards.js')
const makeDropCards = require('./dropCards.js')
const make_webrtcSignaling = require('./webrtcSignaling.js')

const joinRoom = (io, socket, payload) => make_joinRoom(io, socket, payload)
const getRoomData = (io, socket, payload) => makeGetRoomData(io, socket, payload)
const dragCards = (io, socket, payload) => makeDragCards(io, socket, payload)
const dropCards = (io, socket, payload) => makeDropCards(io, socket, payload)

const peerJoin = (io, socket, payload) => {
  console.log(payload)
  return (room) => make_webrtcSignaling({ socket }).onPeerJoin(room)
}

const peerMessage = (io, socket, payload) => {
  console.log(payload)
  return (message) => make_webrtcSignaling({ socket }).onPeerMessage(message)
}

module.exports = { joinRoom, getRoomData, dragCards, dropCards, peerJoin, peerMessage }

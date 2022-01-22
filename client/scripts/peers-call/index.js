import requestTurn from './requestTURN.js'
import { onJoined, onCall, onOffer, onAnswer, onCandidate } from './handlers.js'
import { EventTypes } from './utils.js'

const { roomName, username } = getRoomInfo()
room = roomName
peerName = username

if (room) socket.emit(EventTypes.join, room)
if (location.hostname !== 'localhost') requestTurn('https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913')

socket.on(EventTypes.joined, (payload) => onJoined(payload))
socket.on(EventTypes.call, (payload) => onCall(payload))
socket.on(EventTypes.offer, (payload) => onOffer(payload))
socket.on(EventTypes.answer, (payload) => onAnswer(payload))
socket.on(EventTypes.candidate, (payload) => onCandidate(payload))

import requestTurn from './requestTURN.js'
import { onJoined, onCall, onOffer, onAnswer, onCandidate } from './handlers.js'
import { EventTypes } from './utils.js'

const { roomName, username } = window.getRoomInfo()
window.room = roomName
window.localUserName = username

if (window.room) window.socket.emit(EventTypes.join, window.room)
if (location.hostname !== 'localhost') requestTurn('https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913')

window.socket.on(EventTypes.joined, (payload) => onJoined(payload))
window.socket.on(EventTypes.call, (payload) => onCall(payload))
window.socket.on(EventTypes.offer, (payload) => onOffer(payload))
window.socket.on(EventTypes.answer, (payload) => onAnswer(payload))
window.socket.on(EventTypes.candidate, (payload) => onCandidate(payload))

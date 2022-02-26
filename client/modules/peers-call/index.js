import requestTurn from './requestTURN.js'
import { webrtcListeners } from '../constant/listeners.js'
import { webrtcEvents } from '../constant/events.js'
import { onJoined, onCall, onOffer, onAnswer, onCandidate } from './handlers.js'

const { roomName, username } = getRoomInfo()
room = roomName
localUserName = username

if (room) socket.emit(webrtcEvents.peers_join, room)
if (location.hostname !== 'localhost') requestTurn('https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913')

socket.on(webrtcListeners.peers_joined, (payload) => onJoined(payload))
socket.on(webrtcListeners.peers_call, (payload) => onCall(payload))
socket.on(webrtcListeners.peers_offer, (payload) => onOffer(payload))
socket.on(webrtcListeners.peers_answer, (payload) => onAnswer(payload))
socket.on(webrtcListeners.peers_candidate, (payload) => onCandidate(payload))

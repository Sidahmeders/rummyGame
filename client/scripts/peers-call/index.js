import requestTurn from './requestTURN.js'
import { onJoined, onCall, onOffer, onAnswer, onCandidate } from './handlers.js'

if (room !== '') socket.emit('peer-join', room)
if (location.hostname !== 'localhost') requestTurn('https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913')

socket.on('peer-joined', (payload) => onJoined(payload))
socket.on('peer-call', (payload) => onCall(payload))
socket.on('peer-offer', (payload) => onOffer(payload))
socket.on('peer-answer', (payload) => onAnswer(payload))
socket.on('peer-candidate', (payload) => onCandidate(payload))

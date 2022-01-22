var socket = io()

var getRoomInfo = () => {
  const roomName = location.href.split('/')[4]
  const username = localStorage.getItem('username')
  return { roomName, username }
}

// room-table
var roomState = {
  pickedCardClass: undefined,
  pickedCardElement: undefined,
  droppedCardClass: undefined,
}

// peer-call
var peersMap = {}
var localUuid
var localStream
var localVideo = document.getElementById('localVideo')
var room
var peerName

var turnReady
var STUNServers = null
var mediaConstraint = { audio: false, video: true }
var peerConfig = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
}

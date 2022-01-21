var socket = io()

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

var turnReady
var STUNServers = null
var room // peers-room

var mediaConstraint = { audio: false, video: true }
var peerConfig = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
}

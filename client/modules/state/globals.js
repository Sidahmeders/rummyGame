// eslint-disable-next-line no-undef
window.socket = io()

window.getRoomInfo = () => {
  const roomName = location.pathname.split('/')[2]
  const username = location.search.split('=')[1]
  return { roomName, username }
}

// room table
window.roomState = {
  pickedCardClass: undefined,
  pickedCardElement: undefined,
  droppedCardClass: undefined,
}

// peer call
window.peersMap = {}
window.localUuid = undefined
window.localStream = undefined
window.localVideo = document.getElementById('localVideo')
window.room = undefined
window.localUserName = undefined

window.turnReady = undefined
window.STUNServers = null
window.mediaConstraint = { audio: false, video: true }
window.peerConfig = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
}

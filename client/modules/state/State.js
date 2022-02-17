export default class State {
  constructor() {
    this.socket = io()

    // room table
    this.roomState = {
      pickedCardClass: undefined,
      pickedCardElement: undefined,
      droppedCardClass: undefined,
    }

    // peer call
    this.peersMap = {}
    this.localUuid = undefined
    this.localStream = undefined
    this.localVideo = document.getElementById('localVideo')
    this.room = undefined
    this.localUserName = undefined

    this.turnReady = undefined
    this.STUNServers = null
    this.mediaConstraint = { audio: false, video: true }
    this.peerConfig = {
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
      ],
      iceCandidatePoolSize: 10,
    }
  }

  getRoomInfo() {
    const roomName = location.pathname.split('/')[2]
    const username = location.search.split('=')[1]
    return { roomName, username }
  }
}

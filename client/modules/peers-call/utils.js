export const EventTypes = {
  join: 'peers:join',
  joined: 'peers:joined',
  call: 'peers:call',
  offer: 'peers:offer',
  answer: 'peers:answer',
  candidate: 'peers:candidate',
  message: 'peers:message',
}

export function sendMessage(payload) {
  const message = JSON.stringify({ room: window.room, payload })
  window.socket.emit(EventTypes.message, message)
}

export function onIceCandidate(event) {
  if (event.candidate) {
    sendMessage({ type: EventTypes.candidate, peerUuid: window.localUuid, candidate: event.candidate })
  }
}

export function onRemoteMediaStream(event, peerUuid) {
  //assign stream to new HTML video element
  const remoteVideosContainer = document.getElementById('videos')
  const vidElement = document.createElement('video')
  vidElement.autoplay = true
  vidElement.id = `remoteVideo-${peerUuid}`
  vidElement.srcObject = event.streams[0]
  remoteVideosContainer.append(vidElement)
}

export function onPeerDisconnect(event, peerUuid) {
  const state = window.peersMap[peerUuid].pc.iceConnectionState
  if (state === 'failed' || state === 'closed' || state === 'disconnected') {
    delete window.peersMap[peerUuid]
    const remoteVideosContainer = document.getElementById('videos')
    const targetVideoElement = document.getElementById(`remoteVideo-${peerUuid}`)
    remoteVideosContainer.removeChild(targetVideoElement)
  }
}
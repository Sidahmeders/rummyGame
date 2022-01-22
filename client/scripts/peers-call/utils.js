export const EventTypes = {
  join: 'peer-join',
  joined: 'peer-joined',
  call: 'peer-call',
  offer: 'peer-offer',
  answer: 'peer-answer',
  candidate: 'peer-candidate',
  message: 'peer-message',
}

export function sendMessage(payload) {
  const message = JSON.stringify({ room, payload })
  socket.emit(EventTypes.message, message)
}

export function onIceCandidate(event) {
  if (event.candidate) {
    sendMessage({ type: EventTypes.candidate, peerUuid: localUuid, candidate: event.candidate })
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
  const state = peersMap[peerUuid].pc.iceConnectionState
  if (state === 'failed' || state === 'closed' || state === 'disconnected') {
    delete peersMap[peerUuid]
    const remoteVideosContainer = document.getElementById('videos')
    const targetVideoElement = document.getElementById(`remoteVideo-${peerUuid}`)
    remoteVideosContainer.removeChild(targetVideoElement)
  }
}

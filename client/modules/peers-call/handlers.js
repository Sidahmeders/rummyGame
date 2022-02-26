import { webrtcEvents } from '../constant/events.js'
import { webrtcListeners } from '../constant/listeners.js'

function setupPeer(peerUuid) {
  peersMap[peerUuid] = { id: peerUuid, pc: new RTCPeerConnection(peerConfig) }
  peersMap[peerUuid].pc.onicecandidate = onIceCandidate
  peersMap[peerUuid].pc.ontrack = (event) => onRemoteMediaStream(event, peerUuid)
  peersMap[peerUuid].pc.oniceconnectionstatechange = (event) => onPeerDisconnect(event, peerUuid)
  localStream.getTracks().forEach((track) => peersMap[peerUuid].pc.addTrack(track, localStream))
}

function onIceCandidate(event) {
  if (event.candidate) {
    sendMessage({ type: webrtcListeners.peers_candidate, peerUuid: localUuid, candidate: event.candidate })
  }
}

function sendMessage(payload) {
  const message = JSON.stringify({ room, payload })
  socket.emit(webrtcEvents.peers_message, message)
}

function onRemoteMediaStream(event, peerUuid) {
  //assign stream to new HTML video element
  const remoteVideosContainer = document.getElementById('videos')
  const vidElement = document.createElement('video')
  vidElement.autoplay = true
  vidElement.id = `remoteVideo-${peerUuid}`
  vidElement.srcObject = event.streams[0]
  remoteVideosContainer.append(vidElement)
}

function onPeerDisconnect(event, peerUuid) {
  const state = peersMap[peerUuid].pc.iceConnectionState
  if (state === 'failed' || state === 'closed' || state === 'disconnected') {
    delete peersMap[peerUuid]
    const remoteVideosContainer = document.getElementById('videos')
    const targetVideoElement = document.getElementById(`remoteVideo-${peerUuid}`)
    remoteVideosContainer.removeChild(targetVideoElement)
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function onJoined(payload) {
  try {
    const { socketID, numClients } = JSON.parse(payload)
    localUuid = socketID
    localStream = await navigator.mediaDevices.getUserMedia(mediaConstraint)
    localVideo.srcObject = localStream

    if (numClients) sendMessage({ type: webrtcListeners.peers_call, peerUuid: localUuid })
  } catch (err) {
    console.log(err.message)
  }
}

export async function onCall(payload) {
  try {
    const { peerUuid } = payload
    setupPeer(peerUuid)
    const offerDescription = await peersMap[peerUuid].pc.createOffer()
    await peersMap[peerUuid].pc.setLocalDescription(new RTCSessionDescription(offerDescription))

    sendMessage({ type: webrtcListeners.peers_offer, peerUuid: localUuid, description: offerDescription })
  } catch (err) {
    console.log(err.message)
  }
}

export async function onOffer(payload) {
  try {
    const { peerUuid, description } = payload
    if (!peersMap[peerUuid]) {
      setupPeer(peerUuid)
      await peersMap[peerUuid].pc.setRemoteDescription(new RTCSessionDescription(description))
      const answerDescription = await peersMap[peerUuid].pc.createAnswer()
      await peersMap[peerUuid].pc.setLocalDescription(new RTCSessionDescription(answerDescription))

      sendMessage({ type: webrtcListeners.peers_answer, peerUuid: localUuid, destUuid: peerUuid, description: answerDescription })
    }
  } catch (err) {
    console.log(err.message)
  }
}

export async function onAnswer(payload) {
  try {
    const { peerUuid, destUuid, description } = payload
    if (destUuid === localUuid) {
      await peersMap[peerUuid].pc.setRemoteDescription(new RTCSessionDescription(description))
    }
  } catch (err) {
    console.log(err.message)
  }
}

export async function onCandidate(payload) {
  try {
    const { peerUuid, candidate } = payload
    await peersMap[peerUuid].pc.addIceCandidate(new RTCIceCandidate(candidate))
  } catch (err) {
    console.log(err.message)
  }
}

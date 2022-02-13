import { onIceCandidate, onRemoteMediaStream, onPeerDisconnect, sendMessage, EventTypes } from './utils.js'

function setupPeer(peerUuid) {
  window.peersMap[peerUuid] = { id: peerUuid, pc: new RTCPeerConnection(window.peerConfig) }
  window.peersMap[peerUuid].pc.onicecandidate = onIceCandidate
  window.peersMap[peerUuid].pc.ontrack = (event) => onRemoteMediaStream(event, peerUuid)
  window.peersMap[peerUuid].pc.oniceconnectionstatechange = (event) => onPeerDisconnect(event, peerUuid)
  window.localStream.getTracks().forEach((track) => window.peersMap[peerUuid].pc.addTrack(track, window.localStream))
}

export async function onJoined(payload) {
  try {
    const { socketID, numClients } = JSON.parse(payload)
    window.localUuid = socketID
    window.localStream = await navigator.mediaDevices.getUserMedia(window.mediaConstraint)
    window.localVideo.srcObject = window.localStream

    if (numClients) sendMessage({ type: EventTypes.call, peerUuid: window.localUuid })
  } catch (err) {
    console.log(err.message)
  }
}

export async function onCall(payload) {
  try {
    const { peerUuid } = payload
    setupPeer(peerUuid)
    const offerDescription = await window.peersMap[peerUuid].pc.createOffer()
    await window.peersMap[peerUuid].pc.setLocalDescription(new RTCSessionDescription(offerDescription))

    sendMessage({ type: EventTypes.offer, peerUuid: window.localUuid, description: offerDescription })
  } catch (err) {
    console.log(err.message)
  }
}

export async function onOffer(payload) {
  try {
    const { peerUuid, description } = payload
    if (!window.peersMap[peerUuid]) {
      setupPeer(peerUuid)
      await window.peersMap[peerUuid].pc.setRemoteDescription(new RTCSessionDescription(description))
      const answerDescription = await window.peersMap[peerUuid].pc.createAnswer()
      await window.peersMap[peerUuid].pc.setLocalDescription(new RTCSessionDescription(answerDescription))

      sendMessage({ type: EventTypes.answer, peerUuid: window.localUuid, destUuid: peerUuid, description: answerDescription })
    }
  } catch (err) {
    console.log(err.message)
  }
}

export async function onAnswer(payload) {
  try {
    const { peerUuid, destUuid, description } = payload
    if (destUuid === window.localUuid) {
      await window.peersMap[peerUuid].pc.setRemoteDescription(new RTCSessionDescription(description))
    }
  } catch (err) {
    console.log(err.message)
  }
}

export async function onCandidate(payload) {
  try {
    const { peerUuid, candidate } = payload
    await window.peersMap[peerUuid].pc.addIceCandidate(new RTCIceCandidate(candidate))
  } catch (err) {
    console.log(err.message)
  }
}

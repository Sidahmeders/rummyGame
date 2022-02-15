import { onIceCandidate, onRemoteMediaStream, onPeerDisconnect, sendMessage, EventTypes } from './utils.js'
import state from '../state/index.js'
let { peersMap, peerConfig, mediaConstraint, localVideo, localStream, localUuid } = state

function setupPeer(peerUuid) {
  peersMap[peerUuid] = { id: peerUuid, pc: new RTCPeerConnection(peerConfig) }
  peersMap[peerUuid].pc.onicecandidate = onIceCandidate
  peersMap[peerUuid].pc.ontrack = (event) => onRemoteMediaStream(event, peerUuid)
  peersMap[peerUuid].pc.oniceconnectionstatechange = (event) => onPeerDisconnect(event, peerUuid)
  localStream.getTracks().forEach((track) => peersMap[peerUuid].pc.addTrack(track, localStream))
}

export async function onJoined(payload) {
  try {
    const { socketID, numClients } = JSON.parse(payload)
    localUuid = socketID
    localStream = await navigator.mediaDevices.getUserMedia(mediaConstraint)
    localVideo.srcObject = localStream

    if (numClients) sendMessage({ type: EventTypes.call, peerUuid: localUuid })
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

    sendMessage({ type: EventTypes.offer, peerUuid: localUuid, description: offerDescription })
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

      sendMessage({ type: EventTypes.answer, peerUuid: localUuid, destUuid: peerUuid, description: answerDescription })
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

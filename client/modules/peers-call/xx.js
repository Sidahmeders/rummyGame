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

////////////////////////

import requestTurn from './requestTURN.js'
import { onJoined, onCall, onOffer, onAnswer, onCandidate } from './handlers.js'
import { EventTypes } from './utils.js'

const { roomName, username } = getRoomInfo()
room = roomName
localUserName = username

if (room) socket.emit(EventTypes.join, room)
if (location.hostname !== 'localhost') requestTurn('https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913')

socket.on(EventTypes.joined, (payload) => onJoined(payload))
socket.on(EventTypes.call, (payload) => onCall(payload))
socket.on(EventTypes.offer, (payload) => onOffer(payload))
socket.on(EventTypes.answer, (payload) => onAnswer(payload))
socket.on(EventTypes.candidate, (payload) => onCandidate(payload))

///////////////////////////////////////

export default function requestTurn(turnURL) {
  let turnExists = false
  for (let i in pcConfig.iceServers) {
    if (pcConfig.iceServers[i].urls.substr(0, 5) === 'turn:') {
      turnExists = true
      turnReady = true
      break
    }
  }
  if (!turnExists) {
    console.log('Getting TURN server from ', turnURL)
    // No TURN server. Get one from computeengineondemand.appspot.com:
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let turnServer = JSON.parse(xhr.responseText)
        pcConfig.iceServers.push({
          urls: 'turn:' + turnServer.username + '@' + turnServer.turn,
          credential: turnServer.password,
        })
        turnReady = true
      }
    }
    xhr.open('GET', turnURL, true)
    xhr.send()
  }
}

///////////////////////////////////////////////////////////

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

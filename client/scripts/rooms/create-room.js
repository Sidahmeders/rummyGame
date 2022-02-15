import { errorNotification } from '../notifications/index.js'

function getNewRoomInfo() {
  let roomInfo = {}
  const newRoom = document.getElementById('create-room-form').children
  for (let input of newRoom) {
    const { name, value } = input
    roomInfo[name] = value
  }
  return roomInfo
}

async function hanldeRoomSubmition(event) {
  event.preventDefault()
  const roomInfo = getNewRoomInfo()
  try {
    let response = await fetch('http://localhost:5000/rooms', {
      method: 'POST',
      body: JSON.stringify(roomInfo),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    if (response.status === 201) {
      document.getElementById('create-room-form').reset()
      window.location.reload()
    } else {
      response = await response.json()
      errorNotification(response.errorMsg)
    }
  } catch (error) {
    errorNotification(error)
  }
}

function appendCreateRoomsFrom() {
  const createRoomContainer = document.getElementById('create-room')
  const fromElement = document.createElement('form')
  fromElement.id = 'create-room-form'
  fromElement.onsubmit = hanldeRoomSubmition

  const roomNameInput = document.createElement('input')
  const passwordInput = document.createElement('input')
  const buttonElement = document.createElement('button')

  roomNameInput.placeholder = 'room name'
  roomNameInput.name = 'roomName'
  passwordInput.placeholder = 'room password'
  passwordInput.name = 'password'
  buttonElement.innerText = 'Create Room'

  fromElement.append(roomNameInput, passwordInput, buttonElement)
  createRoomContainer.appendChild(fromElement)
}

appendCreateRoomsFrom()

import joinRoom from './join-room.js'
import { errorNotification } from '../notifications/index.js'

const getRooms = async () => {
  try {
    let response = await fetch('http://localhost:5000/rooms')
    response = await response.json()
    return response
  } catch (error) {
    errorNotification(error)
  }
}

async function appendRooms() {
  const { rooms } = await getRooms()
  const roomsContainer = document.getElementById('rooms-container')

  for (let roomName in rooms) {
    const roomElement = document.createElement('div')
    const formElement = document.createElement('form')
    formElement.id = `roomId-${roomName}`
    formElement.onsubmit = joinRoom

    const roomNameInput = document.createElement('input')
    const passwordInput = document.createElement('input')
    const usernameInput = document.createElement('input')
    const buttonElement = document.createElement('button')

    roomNameInput.value = roomName
    roomNameInput.name = 'roomName'
    roomNameInput.readOnly = true
    passwordInput.placeholder = passwordInput.name = passwordInput.type = 'password'
    usernameInput.placeholder = usernameInput.name = 'username'
    buttonElement.innerText = 'join this room'

    formElement.append(roomNameInput, passwordInput, usernameInput, buttonElement)
    roomElement.appendChild(formElement)
    roomsContainer.appendChild(roomElement)
  }
}

appendRooms()

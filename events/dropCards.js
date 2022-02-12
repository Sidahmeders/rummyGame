const getPlayerData = require('../utils/getPlayerData.js')
const inMemoryActiveGames = require('../store/inMemoryGames')

module.exports = function dropCards(io, socket, payload) {
  console.log(payload)
  const { roomName, username, pickedCardClass } = payload
  const targetRoom = inMemoryActiveGames[roomName]

  if (!targetRoom) {
    socket.emit('room-error', 'something unexpected happens. please refresh the page')
  } else {
    dropCard({ socket, username, roomName, targetRoom, pickedCardClass })
  }
}

function dropCard({ socket, username, roomName, targetRoom, pickedCardClass }) {
  const { playersCards } = targetRoom
  let playerHand = playersCards[username]

  if (playerHand.length <= 14) {
    socket.emit('room-error', 'make sure you have picked a card before you can drop')
  } else {
    playerHand = playerHand.filter((card) => card !== pickedCardClass)
    targetRoom.playersCards[username] = playerHand

    const userData = getPlayerData(username, roomName)
    socket.emit('card-dropped', userData)
  }
}

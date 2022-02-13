const getPlayerData = require('../utils/getPlayerData.js')
const inMemoryActiveGames = require('../store/inMemoryGames')

module.exports = ({ socket, payload, events }) => {
  const { roomName } = payload
  const targetRoom = inMemoryActiveGames[roomName]

  if (!targetRoom) {
    socket.emit(events.roomsError, 'something unexpected happens. please refresh the page')
  } else {
    dropCard({ socket, payload, targetRoom, events })
  }
}

function dropCard({ socket, payload, targetRoom, events }) {
  const { username, roomName, pickedCardClass } = payload
  const { playersCards } = targetRoom
  let playerHand = playersCards[username]

  if (playerHand.length <= 14) {
    socket.emit(events.roomsError, 'make sure you have picked a card before you can drop')
  } else {
    playerHand = playerHand.filter((card) => card !== pickedCardClass)
    targetRoom.playersCards[username] = playerHand

    const userData = getPlayerData(username, roomName)
    socket.emit(events.cardsDropped, userData)
  }
}

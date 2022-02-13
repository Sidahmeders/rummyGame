const getPlayerData = require('../utils/getPlayerData')
const inMemoryActiveGames = require('../store/inMemoryGames')

module.exports = function dragCards(io, socket, payload) {
  const { roomName, username } = payload

  try {
    const targetRoom = inMemoryActiveGames[roomName]
    if (!targetRoom) {
      socket.emit('rooms:error', 'something unexpected happens. please refresh the page')
    } else {
      appendCard({ socket, username, targetRoom, roomName })
    }
  } catch (err) {
    socket.emit('rooms:error', err.message)
  }
}

function appendCard({ socket, username, targetRoom, roomName }) {
  const { cards, playersCards } = targetRoom
  const pickedCard = cards.pop()
  const playerHand = playersCards[username]

  if (playerHand.length >= 15) {
    socket.emit('rooms:error', 'please drop a card before you can pick again')
  } else if (!pickedCard) {
    socket.emit('rooms:error', 'the cards deck is empty')
  } else {
    playerHand.push(pickedCard)

    const playerData = getPlayerData(username, roomName)
    socket.emit('cards:dragged', playerData)
  }
}

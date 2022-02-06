const inMemoryActiveGames = require('../store/inMemoryGames')

module.exports = function dragCards({ socket, roomName, username }) {
  try {
    const targetRoom = inMemoryActiveGames[roomName]
    if (!targetRoom) {
      socket.emit('room-error', 'something unexpected happens. please refresh the page')
    } else {
      appendCard({ socket, username, targetRoom })
    }
  } catch (err) {
    socket.emit('room-error', err.message)
  }
}

function appendCard({ socket, username, targetRoom }) {
  const { cards, playersCards } = targetRoom
  const pickedCard = cards.pop()
  const playerHand = playersCards[username]

  if (playerHand.length >= 15) {
    socket.emit('room-error', 'please drop a card before you can pick again')
  } else if (!pickedCard) {
    socket.emit('room-error', 'the cards deck is empty')
  } else {
    playerHand.push(pickedCard)
    socket.emit('card-dragged', targetRoom)
  }
}

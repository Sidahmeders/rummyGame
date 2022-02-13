const getPlayerData = require('../utils/getPlayerData')
const inMemoryActiveGames = require('../store/inMemoryGames')

module.exports = ({ socket, payload, events }) => {
  const { roomName } = payload

  try {
    const targetRoom = inMemoryActiveGames[roomName]
    if (!targetRoom) {
      socket.emit(events.roomsError, 'something unexpected happens. please refresh the page')
    } else {
      appendCard({ socket, payload, events, targetRoom })
    }
  } catch (err) {
    socket.emit(events.roomsError, err.message)
  }
}

function appendCard({ socket, payload, events, targetRoom }) {
  const { username, roomName } = payload
  const { cards, playersCards } = targetRoom
  const pickedCard = cards.pop()
  const playerHand = playersCards[username]

  if (playerHand.length >= 15) {
    socket.emit(events.roomsError, 'please drop a card before you can pick again')
  } else if (!pickedCard) {
    socket.emit(events.roomsError, 'the cards deck is empty')
  } else {
    playerHand.push(pickedCard)

    const playerData = getPlayerData(username, roomName)
    socket.emit(events.cardsDragged, playerData)
  }
}

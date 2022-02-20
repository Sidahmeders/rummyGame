module.exports = ({ InMemoryGames }) => {
  return (io, socket, roomName, username) => {
    socket.join(roomName)

    let playersIds = InMemoryGames.playersIds
    if (!playersIds) InMemoryGames.playersIds = {}
    else playersIds[username] = socket.id

    io.in(roomName).emit('peers:connect', playersIds)
  }
}

module.exports = ({ roomsDB }) => {
  return async (roomName, password, username) => {
    const rooms = await roomsDB.listRooms()
    const room = rooms[roomName]
    const roomPlayers = room.players
    const roomPassword = room.password

    const isValidPassword = roomPassword === password
    const isValidUsername = roomPlayers.indexOf(username) == -1
    const isValidRoom = roomPlayers.length < 4

    if (!isValidRoom) throw Error('this room is full, please try another one')
    if (!isValidUsername) throw Error('this username already exist')
    if (!isValidPassword) throw Error('the given password is wrong')

    roomPlayers.push(username)
    await roomsDB.updateRoom(roomName, room)
  }
}

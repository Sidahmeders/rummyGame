const InMemoryGames = require('../store/InMemoryGames')

class WebSocketAdapter {
  constructor(ws, socket) {
    this.ws = ws
    this.socket = socket
  }

  on(event, callback) {
    this.socket.on(event, callback)
  }

  emit(event, payload) {
    this.socket.emit(event, payload)
  }

  broadcastToRoom(room, event, payload) {
    this.ws.in(room).emit(event, payload)
  }

  broadcastAll(event, payload) {
    this.ws.emit(event, payload)
  }

  getSocketRooms(room) {
    const socketRooms = this.socket.adapter.rooms.get(room)
    return socketRooms
  }

  joinSocketRooms(username, room) {
    this.socket.join(room)

    let playersIds = InMemoryGames.playersIds
    if (!playersIds) InMemoryGames.playersIds = {}
    else playersIds[username] = this.socket.id

    this.broadcastToRoom(room, 'peers:connect', playersIds)
  }
}

module.exports = WebSocketAdapter

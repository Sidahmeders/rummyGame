/**
 * @emits socket.emit('message',__"this_is_a_test") //sending to sender-client only
 * @emits socket.broadcast.emit('message',__"this_is_a_test") //sending to all clients except sender
 * @emits socket.broadcast.to('game').emit('message',__"nice_game") //sending to all clients in 'game' room(channel) except sender
 * @emits socket.to('game').emit('message',__"enjoy_the_game") //sending to sender client, only if they are in 'game' room(channel)
 * @emits socket.broadcast.to(socketid).emit('message',__"for_your_eyes_only') //sending to individual socketid
 * @emits io.emit('message',__"this_is_a_test") //sending to all clients, include sender
 * @emits io.in('game').emit('message',__"cool_game"); //sending to all clients in 'game' room(channel), include sender
 * @emits io.of('myNamespace').emit('message',__"gg") //sending to all clients in namespace 'myNamespace', include sender
 * @emits socket.emit() //send to all connected clients
 * @emits socket.broadcast.emit() //send to all connected clients except the one that sent the message
 * @emits socket.on() //event listener, can be called on client to execute on server
 * @emits io.sockets.socket() //for emiting to specific clients
 * @emits io.sockets.emit() //send to all connected clients (same as socket.emit)
 * @emits io.sockets.on() //initial connection from a client.
 */

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

  sendToRoom(roomName, event, payload) {
    this.socket.to(roomName).emit(event, payload)
  }

  broadcastToRoom(roomName, event, payload) {
    this.ws.in(roomName).emit(event, payload)
  }

  broadcastAll(event, payload) {
    this.ws.emit(event, payload)
  }

  getSocketRooms(roomName) {
    const socketRooms = this.socket.adapter.rooms.get(roomName)
    return socketRooms
  }

  joinSocketRooms(username, roomName) {
    this.socket.roomName = roomName
    this.socket.username = username
    this.socket.join(roomName)
  }
}

module.exports = WebSocketAdapter

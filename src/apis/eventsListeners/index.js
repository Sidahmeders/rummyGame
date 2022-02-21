const WebSocketAdapter = require('../../infrastructure/wss/WebSocketAdapter')
const listeners = require('../../constant/listeners')
const eventHandlers = require('../eventsHandlers')

module.exports = (ws, socket) => {
  const wsEventEmitter = new WebSocketAdapter(ws, socket)
  const wsEventHandler = eventHandlers(wsEventEmitter)

  wsEventHandler.connection()
  wsEventEmitter.on(listeners.disconnect, wsEventHandler.disconnect)

  wsEventEmitter.on(listeners.roomsData, wsEventHandler.getRoomData)
  wsEventEmitter.on(listeners.joinRoom, wsEventHandler.joinRoom)
  wsEventEmitter.on(listeners.cardsDrag, wsEventHandler.dragCards)
  wsEventEmitter.on(listeners.cardsDrop, wsEventHandler.dropCards)

  wsEventEmitter.on(listeners.peersJoin, wsEventHandler.peerJoin)
  wsEventEmitter.on(listeners.peersMessage, wsEventHandler.peerMessage)
}

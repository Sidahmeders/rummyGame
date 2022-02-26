const WebSocketAdapter = require('../../infrastructure/wss/WebSocketAdapter')
const listeners = require('../../constant/listeners')
const eventHandlers = require('../eventsHandlers')

module.exports = (ws, socket) => {
  const wsEventEmitter = new WebSocketAdapter(ws, socket)
  const wsEventHandler = eventHandlers(wsEventEmitter)

  wsEventHandler.connection()
  wsEventEmitter.on(listeners.disconnect, wsEventHandler.disconnect)

  wsEventEmitter.on(listeners.rooms_data, wsEventHandler.getRoomData)
  wsEventEmitter.on(listeners.rooms_join, wsEventHandler.joinRoom)
  wsEventEmitter.on(listeners.cards_drag, wsEventHandler.dragCards)
  wsEventEmitter.on(listeners.cards_drop, wsEventHandler.dropCards)

  wsEventEmitter.on(listeners.peers_join, wsEventHandler.peerJoin)
  wsEventEmitter.on(listeners.peers_message, wsEventHandler.peerMessage)
}

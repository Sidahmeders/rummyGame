const eventsListeners = require('../../apis/eventsListeners')

function initListener(ws) {
  ws.on('connection', (socket) => eventsListeners(ws, socket))
}

module.exports = initListener

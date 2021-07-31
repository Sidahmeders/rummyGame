
module.exports = function handleActiveRoomDataChange(req, inMemoryActiveGames) {
    const io = req.app.get('socketio')

    io.on('connection', (socket) => {
        socket.on('player-drags-card', (roomName, username, card) => {
            // the userName should be sent from he client
            const temporaryUserName = inMemoryActiveGames[roomName].players[0]

            console.log(temporaryUserName, card, inMemoryActiveGames[roomName])
            
            io.emit('deck-changed', inMemoryActiveGames[roomName])
        })
    })
}

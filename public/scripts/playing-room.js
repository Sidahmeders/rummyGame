
// const socket2 = io()

// socket2.emit('players-streaming-state', 'give me more data')

document.addEventListener('DOMContentLoaded', async () => {
    let roomName = location.href.split('/')[4]
    let response = await fetch(`http://localhost:5000/room-data?roomName=${roomName}`)
    response = await response.json()

    const { data, error } = response

    if (data) {
        const tableElement = document.getElementById('table')
        const { players } = data
        
        players.map(player => {
            const playerElement = document.createElement('h3')
            playerElement.innerText = player
            
            tableElement.appendChild(playerElement)
        })
        
    } else {
        console.log(error)
    }
})

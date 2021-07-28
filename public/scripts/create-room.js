const socket2 = io()

socket2.on('room-error', (error) => {
    console.log(error)
})
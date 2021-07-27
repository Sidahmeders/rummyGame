function handleSubmition(e) {
    e.peventDefault()
    console.log(e)
}

// TODO: create and append an alert message
document.onload = (() => {
    const urlParams = new URLSearchParams(window.location.search)
    const myParam = urlParams.get('error')
    console.log(myParam)
})()

const socket = io()
socket.emit('chat-message', "hello message from client")

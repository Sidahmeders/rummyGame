let roomInfo = {}

function handleInputChange(event) {    
    const { name, value } = event
    roomInfo[name] = value
}

async function hanldeRoomSubmition() {
    try {
        let response = await fetch('http://localhost:5000/create-rooms', {
            method: 'POST',
            body: JSON.stringify(roomInfo),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })

        console.log(response)
    } catch (err) {
        console.log(err.message)
    }
}

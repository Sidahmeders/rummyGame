export default function getRoomInfo() {
    const roomName = location.href.split('/')[4]
    const username = localStorage.getItem('username')

    return {
        roomName,
        username,
    }
}

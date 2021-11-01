import getRoomInfo from '../../utils/getRoomInfo.js'
const socket = io()

export default function dragPlayerCard() {
    const { roomName, username } = getRoomInfo()
    socket.emit('drag-card', roomName, username)
}

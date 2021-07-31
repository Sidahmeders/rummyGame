const express = require('express')
const path = require('path')
const fs = require('fs')

const getTheInitialRoomData = require('./getInitialData')
const inMemoryActiveGames = {}

const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/index.html`))
})

router.post('/create-rooms', (req, res) => {
    const { roomName, password } = req.body

    if (!roomName || !password) {
        res.status(400).json({ error: "please fill in the userName and password" })
    } else {
        const roomsData = fs.readFileSync(
            path.join(`${__dirname}/data`, 'rooms.json'),
            'utf8', 
            (err, data) => {
                if(err) throw err
                return data
            }
        )

        // handle pushing new rooms to database
        const rooms = JSON.parse(roomsData)
        rooms.push({ roomName, password })

        fs.writeFile(
            path.join(`${__dirname}/data`, 'rooms.json'),
            JSON.stringify(rooms), err => {
                if(err) {
                    throw Error(err.message)
                }
                console.log('new room has been added...')
            }
        )
        
        res.status(201).json("new room added successfully")
    }
})

router.get('/get-rooms', (req, res) => {
    const roomsData = fs.readFileSync(
        path.join(`${__dirname}/data`, 'rooms.json'), 
        'utf8', (err, data) => {
            if(err) throw err
            return data
        }
    )

    const rooms = JSON.parse(roomsData)
    res.status(200).json({ rooms })
})

router.get('/room/:roomId', (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/room.html`))
})

router.get('/room-data', (req, res) => {
    const { roomName } = req.query

    getTheInitialRoomData(res, roomName, inMemoryActiveGames)
    handleActiveRoomDataChange(req)
})

function handleActiveRoomDataChange(req) {
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

module.exports = router
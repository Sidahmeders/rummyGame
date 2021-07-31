const express = require('express')
const path = require('path')
const fs = require('fs')

const { createDeck, shuffleTheDeck } = require('./cards54')

const playingGame = {}

const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/index.html`))
})

router.post('/create-rooms', (req, res) => {
    const { roomName, password } = req.body

    if (!roomName || !password) {
        res.status(400).json({ error: "please fill in the userName and password" })
    } else {
        // TODO: replace this with a database
        const roomsData = fs.readFileSync(path.join(`${__dirname}/data`, 'rooms.json'), 'utf8', (err, data) => {
            if(err) throw err
            return data
        })

        // handle pushing new rooms to database
        const rooms = JSON.parse(roomsData)
        rooms.push({ roomName, password })

        fs.writeFile(path.join(`${__dirname}/data`, 'rooms.json'), JSON.stringify(rooms), err => {
            if(err) {
                throw Error(err.message)
            }
            console.log('new room has been added...')
        })
        
        res.status(201).json("new room added successfully")
    }
})

router.get('/get-rooms', (req, res) => {
    // TODO: replace this with a database
    const roomsData = fs.readFileSync(path.join(`${__dirname}/data`, 'rooms.json'), 'utf8', (err, data) => {
        if(err) throw err
        return data
    })

    const rooms = JSON.parse(roomsData)
    res.status(200).json({ rooms })
})

router.get('/room/:roomId', (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/room.html`))
})

router.get('/room-data', (req, res) => {
    const { roomName } = req.query
    const io = req.app.get('socketio')

    if (!roomName) {
        const errorMsg = 'no roomName is provided'
        console.log(errorMsg)
        res.status(400).json({error: errorMsg})
    } else {
        getRoomData(roomName)
        res.status(200).json({ data: playingGame[roomName] })
    }

    io.on('connection', (socket) => {

        socket.on('player-drags-card', (username, card) => {
            console.log(username, card)
        })
    
    })
    
})

function getRoomData(roomName) {
    let roomsData = fs.readFileSync(path.join(`${__dirname}/data`, 'rooms.json'), 'utf8', (err, data) => {
        if(err) throw err
        return data
    })
    roomsData = JSON.parse(roomsData)
    const { players } = roomsData.filter(room => room.roomName === roomName)[0]

    const playingCards = shuffleTheDeck(createDeck())
    handlePlayingGame(roomName, playingCards, players)
}

function handlePlayingGame(roomName, deckOfCards, players) {
    const playersCards = {}
    players.forEach(player => {
        playersCards[player] = deckOfCards.splice(0, 8)
    })
    
    playingGame[roomName] = {
        cards: deckOfCards,
        players,
        playersCards
    }
}

module.exports = router
const express = require('express')
const path = require('path')
const fs = require('fs')
// const io = req.app.get('socketio')

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
        
        res.status(201).redirect('/')
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

module.exports = router
const express = require('express')
const path = require('path')
const { createRooms, getAllRooms } = require('../controllers')

const router = express.Router()

const readFile = (fileName) => path.join(`${__dirname}/../../client/${fileName}`)

router.get('/', (_, res) => res.sendFile(readFile('index.html')))
router.get('/rooms', (_, res) => res.sendFile(readFile('rooms.html')))
router.get('/room/:roomId', (_, res) => res.sendFile(readFile('room.html')))

router.get('/apis/rooms', getAllRooms)
router.post('/apis/rooms', createRooms)

module.exports = router

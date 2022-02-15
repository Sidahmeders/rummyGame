const express = require('express')
const path = require('path')
const { createRooms, getAllRooms } = require('../controllers')

const router = express.Router()

router.get('/', (req, res) => res.sendFile(path.join(`${__dirname}/../../client/index.html`)))
router.get('/room/:roomId', (req, res) => res.sendFile(path.join(`${__dirname}/../../client/room.html`)))
router.get('/rooms', getAllRooms)

router.post('/rooms', createRooms)

module.exports = router

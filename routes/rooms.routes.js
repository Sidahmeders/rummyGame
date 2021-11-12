const express = require('express')
const path = require('path')

const { createRooms, getAllRooms } = require('../controllers/index')

const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../public/index.html`))
})

router.post('/create-rooms', (req, res) => {
    createRooms(req, res)
})

router.get('/get-rooms', (req, res) => {
    getAllRooms(req, res)
})

router.get('/room/:roomId', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../public/room.html`))
})

module.exports = router

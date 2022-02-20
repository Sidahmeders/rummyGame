const express = require('express')
const { createRooms, getAllRooms } = require('../controllers')

const router = express.Router()

router.get('/', getAllRooms)
router.post('/', createRooms)

module.exports = router

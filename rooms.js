const express = require('express')
const path = require('path')
const fs = require('fs')

const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/home.html`))
})

router.post('/', (req, res) => {
    const { roomName, password } = req.body

    if (!roomName || !password) {
        res.redirect('?error=please fill all fileds')
    } else {
        // TODO: replace this with a database
        const jsonData = fs.readFileSync(path.join(`${__dirname}/`, 'database.json'), 'utf8', (err, data) => {
            if(err) throw err
            return data
        })

        // handle pushing new rooms to database
        const myData = JSON.parse(jsonData)
        myData.push({ roomName, password })
        
        fs.writeFile(path.join(`${__dirname}/`, 'database.json'), JSON.stringify(myData), err => {
            if(err) {
                throw Error(err.message)
            }
            console.log('new room has been added...')
        })
        
        res.status(201).redirect('/')
    }
})

router.get('/join', (req, res) => {
    // TODO: replace this with a database
    const jsonData = fs.readFileSync(path.join(`${__dirname}/`, 'database.json'), 'utf8', (err, data) => {
        if(err) throw err
        return data
    })

    const rooms = JSON.parse(jsonData)
    res.status(200).json({ rooms })
})

module.exports = router
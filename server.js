// const express = require('express')

// const app = express()

// app.use(express.static(__dirname + '/public'))
// app.use(express.json())
// app.use(express.urlencoded({extended: false}))


// app.use('/', require('./rooms'))

// const PORT = process.env.PORT || 5000
// app.listen(PORT, console.log(`server running on port ${PORT}..`))

const io = require('socket.io')(4000)

io.on('connection', (socket) => {
    console.log(socket.id)
})

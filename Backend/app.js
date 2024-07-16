const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//using body-parser for handling request bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//using the routing files to acces their endpoints
app.use('/users', require('./routes/userRoutes.js'))
app.use('/books', require('./routes/bookRoutes.js'))
app.use('/reviews', require('./routes/reviewRoutes.js'))

//basic confirmation message
app.get('/', (req, res) => {
    res.send('Node App is running')
    res.end()
})

const port = process.env.PORT || 5000
app.listen(port, console.log('Server started on port', port))

const express = require('express')
const app = express()

app.use('/users', require('./routes/userRoutes.js'))
app.use('/books', require('./routes/bookRoutes.js'))
app.use('/reviews', require('./routes/reviewRoutes.js'))

app.get('/', (req, res) => {
    res.send('Node App is running')
    res.end()
})

const port = process.env.PORT || 5000
app.listen(port, console.log('Server started on port', port))
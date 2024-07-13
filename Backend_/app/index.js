const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use('/api/users', users)
app.use('/api/books', books)
app.use('/api/reviews', reviews)

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/books', require('./routes/bookRoutes'))
app.use('/api/reviews', require('./routes/reviewRoutes'))

module.exports = app
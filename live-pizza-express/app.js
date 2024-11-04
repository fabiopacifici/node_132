// the package dotenv is no longer
//require('dotenv').config()
const express = require('express')
const app = express()
// import all routes defined in the routes folder
const PizzeRouter = require('./routes/pizze.js')
const UsersRouter = require('./routes/users.js')

// middleware to parse the body of the request
app.use(express.json())

const HOST = process.env.HOST
const PORT = process.env.PORT

// start the server
app.listen(PORT, (req, res) => {
  console.log(`Server is running at ${HOST}:${PORT}`);

})

// Create your first route
app.get('/', (req, res) => {
  res.send('Pizzeria Rest API')
})

// Pizzeria API
app.use('/pizze', PizzeRouter)

app.use('/users', UsersRouter)



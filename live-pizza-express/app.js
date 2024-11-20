// the package dotenv is no longer
//require('dotenv').config()
const express = require('express')
const app = express()
// import all routes defined in the routes folder
const PizzeRouter = require('./routes/pizze.js')
const UsersRouter = require('./routes/users.js')
const notFoundMiddleware = require('./middlewares/notFoundMiddleware.js')
const logger = require('./middlewares/loggerMiddleware.js')
// middleware to parse the body of the request
app.use(express.json())

app.use(express.static('public'))



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

app.use(logger)

/* 
app.use('/pizze', (req, res, next) => {
  throw new Error('This is a custom error')
})
 */
app.use('/pizze', PizzeRouter)

app.use('/users', UsersRouter)


app.use(notFoundMiddleware);


// handle server errors 
app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).send({
    status: 500,
    message: err.message
  })
}) 
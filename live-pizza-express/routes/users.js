// Import express
const express = require('express')
// define the router instance
const router = express.Router()
const UserController = require('../controllers/UserController.js')
// define all routes here

// index (prints the entire resource list)
router.get('/', UserController.index)

// show (prints only the single resource)
router.get('/:id', UserController.show)

//create (creates a new pizza)
//router.post('/pizze', UserController.store)


// export the router instance
module.exports = router
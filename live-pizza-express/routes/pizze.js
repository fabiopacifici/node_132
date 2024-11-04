// Import express
const express = require('express')
// define the router instance
const router = express.Router()
const PizzaController = require('../controllers/PizzaController.js')
// define all routes here

// index (prints the entire resource list)
router.get('/', PizzaController.index) // /pizze

// show (prints only the single resource) 
router.get('/:id', PizzaController.show) // /pizze/1

//create (creates a new pizza)
router.post('/', PizzaController.store) // /pizze


// export the router instance
module.exports = router
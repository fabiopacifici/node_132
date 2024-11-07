// Import express
const express = require('express')
// define the router instance
const router = express.Router()
const PizzaController = require('../controllers/PizzaController.js')
// define all routes here

// CRUD routes

// (R) index (prints the entire resource list)
router.get('/', PizzaController.index) // /pizze

// (R) show (prints only the single resource) 
router.get('/:id', PizzaController.show) // /pizze/1

// (C) store (creates a new pizza)
router.post('/', PizzaController.store) // /pizze

// (U) update (updates an existing pizza)
router.put('/:id', PizzaController.update) // /pizze/1

// (D) destroy (deletes a single pizza)
router.delete('/:id', PizzaController.destroy) // /pizze/1

module.exports = router
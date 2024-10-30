const express = require('express')
const PizzaController = require('./Controllers/PizzaController.js')
const app = express()
app.use(express.static('public'))

const host = 'http://127.0.0.1'
const port = 3005



// start the serve
app.listen(port, () => {
  console.log(`Example app listening on ${host}:${port}`)
})

// Use the express routing system 
app.get('/', (req, res) => {

  const markup = `
    <h1>Pizzeria</h1>
    <img src="/img/pizza-vegana.webp" alt="pizza vegana">
  `
  res.send(markup)
})



app.get('/pizze', PizzaController.index)


app.get('/pizza', (req, res) => {

  const pizza = {
    name: 'vegana',
    price: '10.99',
    ingredients: ['pizza base', 'mozzarella vegana', 'salsiccia vegana']
  }

  res.json(pizza)

})
const menu = require('../db/menu.js')
const fs = require('fs')
const index = (req, res) => {

  // create the response object you want to send
  const responseData = {
    data: menu,
    counter: menu.length
  }

  // send the response with the 200 status code
  res.status(200).json(responseData)

}


const show = (req, res) => {
  //console.log(req.params.id);
  console.log(req);
  const pizza = menu.find(pizza => pizza.id === Number(req.params.id))
  //console.log(pizza);

  if (!pizza) {
    return res.status(404).json({
      error: `404! Not found`
    })
  }
  return res.status(200).json({
    data: pizza
  })

}


const store = (req, res) => {
  console.log(req);
  console.log(req.body);

  // create a new object for the new pizza
  const pizza = {
    id: menu[menu.length - 1].id + 1,
    name: req.body.name,
    slug: req.body.slug,
    type: req.body.type,
    image: req.body.image,
    ingredients: req.body.ingredients
  }

  // saving in memory 
  menu.push(pizza)

  // update 
  fs.writeFileSync('./db/menu.js', `module.exports = ${JSON.stringify(menu, null, 4)}`)

  // 
  res.json({
    staus: 201,
    data: menu,
    counter: menu.length
  })

}


module.exports = {
  index,
  show,
  store
}
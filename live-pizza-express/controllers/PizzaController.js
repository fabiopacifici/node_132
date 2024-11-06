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

// update the pizza
const update = (req, res) => {

  console.log(req.params);

  // find the pizza by id
  const pizza = menu.find(pizza => pizza.id === Number(req.params.id))
  // chek if the pizza exists
  console.log(pizza);

  if (!pizza) {
    return res.status(404).json({
      error: `404! Not found`
    });
  }

  // update the pizza object
  pizza.name = req.body.name;
  pizza.slug = req.body.slug;
  pizza.type = req.body.type;
  pizza.image = req.body.image;
  pizza.ingredients = req.body.ingredients;

  // update the file with the new data
  fs.writeFileSync('./db/menu.js', `module.exports = ${JSON.stringify(menu, null, 4)}`)


  // return the new pizza array
  res.json({
    status: 201,
    data: menu,
    counter: menu.length
  })

}


// delete the pizza
const destroy = (req, res) => {
  console.log(req.params);

  // find the pizza by id
  const pizza = menu.find(pizza => pizza.id === Number(req.params.id))
  console.log(pizza);

  // chek if the pizza exists
  if (!pizza) {
    return res.status(404).json({ error: `404! No pizza found with the this id: ${req.params.id}` });
  }

  // delete the pizza
  const newMenu = menu.filter(pizza => pizza.id !== Number(req.params.id))

  // update the file with the new data
  fs.writeFileSync('./db/menu.js', `module.exports = ${JSON.stringify(newMenu, null, 4)}`)

  // return the new pizza array
  res.json({
    status: 201,
    data: newMenu,
    counter: newMenu.length
  })
}



module.exports = {
  index,
  show,
  store,
  update,
  destroy
}
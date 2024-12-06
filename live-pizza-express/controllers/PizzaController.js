const menu = require('../db/menu.js')
const fs = require('fs')
const connection = require('../db/connection')



const index = (req, res) => {


  // prepare a sql query to get all pizzas from the db
  const sql = 'SELECT * FROM pizzas'
  // execute the query
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const responseData = {
      data: results,
      counter: results.length
    }

    res.status(200).json(responseData);
  })
}


const show = (req, res) => {
  //console.log(req.params.id);
  const id = req.params.id;
  console.log(id);

  // prepare the sql query
  const sql = 'SELECT * FROM pizzas WHERE id=?'

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    // handle the 404 error
    if (!results[0]) return res.status(404).json({ error: `404! Not found` })

    const responseData = {
      data: results[0],
    }

    console.log(responseData);

    // return the pizza
    res.status(200).json(responseData);

  })

  //console.log(req);
  /*  const pizza = menu.find(pizza => pizza.id === Number(req.params.id))
   //console.log(pizza);
 
   if (!pizza) {
     return res.status(404).json({
       error: `404! Not found`
     })
   }
   return res.status(200).json({
     data: pizza
   }) */



} // Closing parenthesis of show function


const store = (req, res) => {
  console.log(req);
  console.log(req.body);

  // create a new object for the new pizza
  const pizza = {
    id: menu[menu.length - 1].id + 1,
    name: req.body.name,
    description: req.body.description,
    is_available: req.body.is_available,
    price: req.body.price,
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
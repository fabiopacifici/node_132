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

  // prepare the sql query to get the pizza by its id
  const sql = 'SELECT * FROM pizzas WHERE id=?'

  // prepare another query to get all the ingredients associated with that pizza
  const ingredientsSql = `
    SELECT ingredients.*
    FROM ingredients
    JOIN pizza_ingredients ON ingredients.id = pizza_ingredients.ingredient_id
    WHERE pizza_ingredients.pizza_id = ?
  `;


  // exectute the first query to get the pizza by its id
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    // handle the 404 error
    if (!results[0]) return res.status(404).json({ error: `404! Not found` })

    // perpare the response data
    const pizza = results[0]
    console.log('Pizza obj', pizza);

    // execute the second query to get all the ingredients associated with that pizza
    connection.query(ingredientsSql, [id], (err, ingrediensResults) => {
      // handle 500 error
      if (err) return res.status(500).json({ error: err })
      console.log('👉', ingrediensResults);

      pizza.ingredients = ingrediensResults;


      const responseData = {
        data: pizza,
      }

      console.log(responseData);

      // return the pizza
      res.status(200).json(responseData);

    })

  })

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


  //1. take the resource id from the request
  const id = req.params.id

  //2. prepare the sql query to delete the record form the db
  const sql = 'DELETE FROM pizzas WHERE id=?'

  //3. perform the prepared statement query
  connection.query(sql, [id], (err, results) => {
    console.log(err, results);
    if (err) return res.status(500).json({ error: err })
    //4. handle a 404 error if the record is not found
    if (results.affectedRows === 0) return res.status(404).json({ error: `404! No pizza found with the this id: ${id}` })

    return res.json({ status: 204, affectedRows: results.affectedRows })

  })
}



module.exports = {
  index,
  show,
  store,
  update,
  destroy
}
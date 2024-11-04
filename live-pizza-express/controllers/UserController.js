const users = require('../db/users.js')

const index = (req, res) => {

  // create the response object you want to send
  const responseData = {
    data: users,
    counter: users.length
  }

  // send the response with the 200 status code
  res.status(200).json(responseData)

}


const show = (req, res) => {
  //console.log(req.params.id);
  console.log(req);
  const pizza = users.find(pizza => pizza.id === Number(req.params.id))
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


module.exports = {
  index,
  show
}
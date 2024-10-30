const pizze = require('../data/pizze.js');


function index(req, res) {

  res.json({
    data: pizze,
    count: pizze.length
  })
}


module.exports = {
  index
}
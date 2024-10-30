console.log('Hi there');
// legacy cjs
const axios = require('axios')
// new esm 
// import axios from 'axios';

//console.log(axios);

axios
  .get('https://jsonplaceholder.typicode.com/todos')
  .then(response => {
    console.log(response.data.splice(0, 10));
  }).catch(err => console.error(err))

/*   
fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  }) */


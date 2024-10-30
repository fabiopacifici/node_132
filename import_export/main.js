// import some features from a cjs module
const user = require('./user-module.js')

console.log(user);
console.log(user.name);


// import multiple features
// example import of the entire oject exported
const utilies = require('./utilities-module.js');
// import single features
//const { calcAge, now } = require('./utilities-module.js')
// console.log(now)
//calcAge(1980)
// use the object and it's property
console.log(utilies.now);


const age = utilies.calcAge(1980)
console.log(age);


/* 
Segui questi tre step creando i rispettivi files:

1 - names.js
Crea una funzione che accetta due parametri: firstName, lastName. La funzione dovrebbe restituire un oggetto con le proprietà firstName e lastName.
Esporta la funzione dal file.

2 - hobbies.js
Crea una funzione che accetta tre parametri: hobbyOne, hobbyTwo, hobbyThree. La funzione dovrebbe restituire un oggetto con una proprietà hobbies, che è un array di hobby.
Esporta la funzione dal file.

3 - people.js*
Importa la tua funzione da names.js
Importa la tua funzione da hobbies.js


Crea una funzione che non ha parametri. La funzione dovrebbe restituire un oggetto con tre proprietà: firstName, lastName, hobbies.
All'interno della tua funzione, usa le tue due funzioni precedenti per costruire l'oggetto.

*/

const makeUser = require('./names.js')
const getHobbies = require('./hobbies.js')




function createUserAccount() {


  const user = makeUser('Vincenzo', 'Polverino')
  //console.log(user);

  const hobbies = getHobbies('Gamer', 'Eat Pizza', 'Learn js')
  //console.log(hobbies);

  const newUser = { ...user, ...hobbies }

  return newUser

}

const user = createUserAccount()
console.log(user);

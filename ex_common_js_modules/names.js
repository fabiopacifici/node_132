/* 
1 - names.js
Crea una funzione che accetta due parametri: firstName, lastName. La funzione dovrebbe restituire un oggetto con le proprietà firstName e lastName.
Esporta la funzione dal file.

*/

function makeUser(firstName, lastName) {
  const user = {
    firstName,
    lastName
  }

  return user
}


module.exports = makeUser
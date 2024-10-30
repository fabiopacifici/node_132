/* 2 - hobbies.js
Crea una funzione che accetta tre parametri: hobbyOne, hobbyTwo, hobbyThree.
La funzione dovrebbe restituire un oggetto con una proprietà hobbies, che è un array di hobby.
Esporta la funzione dal file. */

function getHobbies(hobbyOne, hobbyTwo, hobbyThree) {
  const hobbies = [hobbyOne, hobbyTwo, hobbyThree]
  return { hobbies }
}

function getHobbiesRev(...hobbies) {
  return { hobbies }
}

//getHobbiesRev('coding', 'coding', 'coding', 'coding', 'tv series')

module.exports = getHobbies
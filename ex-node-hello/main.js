/* 

Creiamo la prima applicazione con NodeJs:

- Iniziate creando un file `main.js` con un semplice `console.log` che dica `hello node js`
fate girare lo script usando `node main.js`

- aggiungete allo script una variabile di ambiente chiamata `PIN`  con associato numero a piacere es. `PIN=666`

- usate il modulo `process` per recuperare e stampare in console dalla proprietá `env` la variabile `PIN`

- ora passate un **argomento** al vostro script e recuperatene il valore usando `process` e la proprietá `argv` per stamparlo in console

Bonus:
- SE il valore dell'argomento é `admin` ed il valore di `PIN` definito é `666` allora stampa in `console` `Welcome Admin` **altrimenti** stampa `Access restricted`

*/

console.log('Hello Node.js');

// read the environment variable
const PIN = process.env.PIN;
//console.log(PIN);

if (!PIN) {
  console.error('❌ You must add a PIN variable');
  process.exit(1)
}

// read the value of the argument
//console.log(process.argv);
const user = process.argv[2]
//console.log(user);
if (!user) {
  console.error('❌ You must add a user argument');
  process.exit(1)
}


// Bonus

/* if (user == 'admin' && PIN == 666) {
  console.log('✅ Welcome Admin');
} else {
  console.log('❌ Access Denied');
}
 */
canAccess(user, PIN)


function canAccess(user, PIN) {
  if (user == 'admin' && PIN == 666) {
    console.log('✅ Welcome Admin');
  } else {
    console.log('❌ Access Denied');
  }
}

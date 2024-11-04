# Express Routing System & CRUD Operations

- read
- create

## CRUD(R) - Read  

In this day we will learn how to use express routing.

- create a new folder
- add an entry point file
- initialize npm in the project
- add express as dependency

```bash

touch app.js
npm init -y
npm i express
# install nodemon (optional)
npm i -D nodemon
# install dotenv (optional)
npm i -D dotenv
```

Next move into the app.js file and add create our express server instance.

```js
const express = require('express')
const app = express()

// static files (optional)
app.use(express.static('/public'))


app.listen(3000, () => {
  console.log("Server started on port 3000")
});
```

now let's edit our package json and add a script to start and one to watch the files for changes.

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "dev": "node --watch --env-file=.env app.js"
  },
```

Make sure to create a file called `.env` for the environment variables.

>NOTE: You can use `nodemon` and `dotenv` packages to start the server and read the environment variables, however we will not use them as recent versions of node are using native support for this.

### Add a new route to our app

Now that our server is ready we can add a new route to respond to get requests from the client and return a json response to the user with our menu of pizzas.

We will start by adding our menu in a dedicated file called `menu.js` in the db foder

```bash
mkdir db
touch db/menu.js

```

In the menu.js file we will export an array with the menu items.

```js
const menu = [
  {
    id: 1,
    name: "Margherita",
    slug: "margherita",
    type: "classica",
    image: "pizze/margherita.webp",
    ingredients: ["pomodoro", "mozzarella"],
  },
  {
    id: 2,
    name: "Marinara",
    slug: "marinara",
    type: "classica",
    image: "pizze/marinara.jpeg",
    ingredients: ["pomodoro", "aglio", "origano"],
  },
  {
    id: 3,
    name: "Diavola",
    slug: "diavola",
    type: "speciale",
    image: "pizze/diavola.jpeg",
    ingredients: ["pomodoro", "mozzarella", "salame piccante"],
  },
  {
    id: 3,
    name: "Bufalina",
    slug: "bufalina",
    type: "speciale",
    image: "pizze/bufalina.jpeg",
    ingredients: ["pomodoro", "mozzarella di bufala"],
  },
  {
    id: 4,
    name: "4 formaggi",
    slug: "4-formaggi",
    type: "classica",
    image: "pizze/4_formaggi.jpeg",
    ingredients: ["pomodoro", "mozzarella", "gorgonzola", "parmigiano", "ricotta"],
  }
]

module.exports = menu;
```

Now with the data available let's return the json response from our first endpoint.

Back in the app.js file let's import our menu and create our first endpoint.

```js
// import the menu.js file
const menu = require('./db/menu.js')

// Let's now create our first endpoints
// (index) Get all pizzas
app.get('/pizze', (req, res) => {
  res.json({ data: menu, count: menu.length })
});
```

next let's create a second endpoint that will return a single pizza based on its id.

```js
// (show) Get a single pizza by its ID
app.get('/pizze/:id', (req, res) => {

  // find the pizza by id
  const pizza = menu.find((pizza) => pizza.id === parseInt(req.params.id))
  if (!pizza) {
    return res.status(404).json({ error: "No pizza found with that id" })
  }
  return res.status(200).json({ data: pizza })
});

```

In the route above we used the request to read the current parameter value (the id) that we will use to find a specific value from the menu array and read its information as JSON.

> NOTE: when we use res.json or res.send the execution of the code isn't stopped therefore if we don't use the return keyword or an else block express with try to send two responses resulting in headers already sent error when there is no pizza with that ID found.

### Refactoring - using a controller

As we have seen yesterday we can use controllers to organize our code.
So the first thing we want to do is create a new folder and place our controller file in it. Next we will move our routes inthere.

```bash
mkdir controllers
touch controllers/pizza-controller.js

```

In the controllr file we can move our menu import and update its path
then we can grab the functions we created for our routes earlier and place them inside a controller.

### Index method

```js
// pizza-controller.js
const menu = require('../db/menu.js')
```

Now its the turn of the function

```js
// pizza-controller.js

const index = (req, res) => {
  res.json({ data: menu, count: menu.length })
}
```

and we can export it at the bottom of the controller file.

```js
module.exports = {
  index
}
```

> NOTE: we return an object since we will export other methods from this controller

**Update the app.js file**
Now we can update the app.js file to use our new controller.

First import the controller file and then use it in the routes.

```js
const PizzaController = require('./controllers/PizzaController');

// .. then use it
app.get('/pizze', PizzaController.index);

```

Let's test this in postman and move on.

### Show method

Now let's follow the same steps to update our show route.
Move the function from the app.js file and create a show method in the controller file, like so:

```js
// PizzaController.js

const show = (req, res) => {

  // find the pizza by id
  const pizza = menu.find((pizza) => pizza.id === parseInt(req.params.id))
  if (!pizza) {
    return res.status(404).json({ error: "No pizza found with that id" })
  }
  return res.status(200).json({ data: pizza })
}
```

Now we need to update our export and then the app.js file.

```js
// PizzaController.js
module.exports = {
  index,
  show
}

```

And now we can use it

**update the app.js file**

```js
// (show) Get a single pizza by its ID
app.get('/pizze/:id', PizzaController.show);
```

Let's test this in postman and we are almost there!
Great if it still works we are done!

Now let's see how we can implement the express router in our application and make our code even more clean and readable.

### Express Router

In the previous section, we created a new controller file to handle all the routes. This is not necessary but it makes our code cleaner. Now we will use the express router and update our code.

> NOTE: there is nothing wrong with the previous approach. It's just that we are using a more advanced approach.

This is where we are now and how our app.js file looks like:

```js
const express = require('express')
const app = express()
const PizzaController = require('./controllers/PizzaController');
// static files (optional)
app.use(express.static('/public'))

app.listen(3000, () => {
  console.log("Server started on port 3000")
});

// Let's now create our first endpoints
// (index) Get all pizzas
app.get('/pizze', PizzaController.index);

// (show) Get a single pizza by its ID
app.get('/pizze/:id', PizzaController.show);

```

### Create the router file

Let's create a new folter where we can place all routes related to a given entity. In our case, it will be pizza.js.

```bash
mkdir routes
touch routes/pizza.js

```

Now we can move our routes inside the file and export them as a module.

In the routes file pizza.js

```js
// import express and create the router instance
const express = require('express')
const router = express.Router()


// your routes go here


module.exports = router

```

Now let's move our routes from app.js to pizza.js file and replace app with an instance of router.

We will change from this

```js
// your routes go here

// (index) Get all pizzas
app.get('/pizze', PizzaController.index);

// (show) Get a single pizza by its ID
app.get('/pizze/:id', PizzaController.show);
```

to this

```js
// (index) Get all pizzas
router.get('/pizze', PizzaController.index);

// (show) Get a single pizza by its ID
router.get('/pizze/:id', PizzaController.show);
```

But as of now things aren't working because we need to move our controller import to the routes file too.

**import the controller**
at the top of the file with the other imports

```js
const PizzaController = require('../controllers/PizzaController');

```

### Use the router

Now we can use the router in app.js and replace the app instance with the router instance.

```js

// import the pizza routes
const pizzaRoutes = require('./routes/pizza')

// use the middleware to use the routes
app.use('/pizze', pizzaRoutes)

```

> NOTE: notice that we can pass a `/pizze` as a prefix for all routes. This is useful when you want to have a common prefix for all routes.

Since we used the prefix when calling our routes, we need to update the routes file too to reflect this change.

```js
// routes/pizza.js
// (index) Get all pizzas
app.get('/', PizzaController.index);

// (show) Get a single pizza by its ID
app.get('/:id', PizzaController.show);
```

### Final version

This is our final version of the routes file.

```js
// routes/pizza.js
const express = require('express')
const router = express.Router()
const PizzaController = require('../controllers/PizzaController');


// your routes go here

// Let's now create our first endpoints
// (index) Get all pizzas
router.get('/', PizzaController.index);

// (show) Get a single pizza by its ID
router.get('/:id', PizzaController.show);


module.exports = router
```

Below there is the final version of app.js file.

```js
// app.js
const express = require('express')
const app = express()
//const PizzaController = require('./controllers/PizzaController');
const pizzaRoutes = require('./routes/pizza')
// static files (optional)
app.use(express.static('/public'))


app.listen(3000, () => {
  console.log("Server started on port 3000")
});

app.use("/pizze", pizzaRoutes)


```

And here is our controller.

```js
// controllers/PizzaController.js
// import the menu.js file
const menu = require('../db/menu.js')


const index = (req, res) => {
  res.json({ data: menu, count: menu.length })
}

const show = (req, res) => {

  // find the pizza by id
  const pizza = menu.find((pizza) => pizza.id === parseInt(req.params.id))
  if (!pizza) {
    return res.status(404).json({ error: "No pizza found with that id" })
  }
  return res.status(200).json({ data: pizza })
}

module.exports = {
  index,
  show
}

```

Let's test it in postman or in the browser and we are done!

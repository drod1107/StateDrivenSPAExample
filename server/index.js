//These lines are always at the top, but below imports

require("dotenv").config();
const mongoose = require(`mongoose`);
const express = require("express");
const pizzas = require("./controllers/pizzas");
const orders = require("./controllers/orders");

const dbConnect = process.env.DB_CONNECT || "mongodb://localhost/pizzas";
mongoose.connect(process.env.DB_CONNECT);
const app = express();
const db = mongoose.connection;

db.on(`error`, console.error.bind(console, `connection error`));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

//Middleware
const myMiddleware = (request, response, next) => {
  // do something with request and/or response
  request.params.foobar = "Savvy";
  next(); // tell express to move to the next middleware function
};

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

//converts json string data from front end to actual json object to use or store in backend
app.use(express.json());
app.use(myMiddleware); // use the myMiddleware for every request to the app
app.use(cors);
app.use("/pizzas", pizzas);
app.use("/orders", orders);

app
  .route("/")
  .get((request, response) => {
    response.send("HELLO WORLD");
  })
  .post((request, response) => {
    response.json(request.body);
  });

// //Create Schema
// const pizzaSchema = new mongoose.Schema({
//   crust: String,
//   cheese: String,
//   sauce: String,
//   toppings: [String]
// });
// //Convert Schema into model with CRUD operators
// const Pizza = mongoose.model("Pizza", pizzaSchema);

// //Create route
// app.post("/pizzas", (request, response) => {
//   const newPizza = new Pizza(request.body);
//   newPizza.save((err, pizza) => {
//     return err ? response.sendStatus(500).json(err) : response.json(pizza);
//   });
// });

// app.get("/pizzas", (request, response) => {
//   Pizza.find({}, (error, data) => {
//     if (error) return response.sendStatus(500).json(error);
//     return response.json(data);
//   });
// });

// app.get("/pizzas/:id", (request, response) => {
//   Pizza.findById(request.params.id, (error, data) => {
//     if (error) return response.sendStatus(500).json(error);
//     return response.json(data);
//   });
// });

// app.delete("/pizzas/:id", (request, response) => {
//   Pizza.findByIdAndRemove(request.params.id, {}, (error, data) => {
//     if (error) return response.sendStatus(500).json(error);
//     return response.json(data);
//   });
// });

// app.put("/pizzas/:id", (request, response) => {
//   Pizza.findByIdAndUpdate(
//     request.params.id,
//     {
//       $set: {
//         crust: request.body.crust,
//         cheese: request.body.cheese,
//         sauce: request.body.sauce,
//         toppings: request.body.sauce
//       }
//     },
//     (error, data) => {
//       if (error) return response.sendStatus(500).json(error);
//       return response.json(request.body);
//     }
//   );
// });

// app.route("/pizzas/:id").get((request, response) => {
//   // express adds a "params" Object to requests
//   const id = request.params.id;
//   // handle GET request for post with an id of "id"
//   response.status(418).json({
//     id: id
//   });
// });

app.route("/**").get((request, response) => {
  response.status(404).send("NOT FOUND");
});

//This line is always last
const PORT = process.env.PORT || 4040;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const mongoose = require("mongoose");

//Create Schema
const pizzaSchema = new mongoose.Schema({
  crust: String,
  cheese: String,
  sauce: String,
  toppings: [String]
});
//Convert Schema into model with CRUD operators
const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = {
  model: Pizza,
  schema: pizzaSchema
};

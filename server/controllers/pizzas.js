const express = require("express");
const Pizza = require("../models/pizza");

const router = express.Router();

//Create route
router.post("/", (request, response) => {
  const newPizza = new Pizza.model(request.body);
  newPizza.save((err, pizza) => {
    return err ? response.sendStatus(500).json(err) : response.json(pizza);
  });
});

router.get("/", (request, response) => {
  Pizza.model.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.get("/:id", (request, response) => {
  Pizza.model.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.delete("/:id", (request, response) => {
  Pizza.model.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.put("/:id", (request, response) => {
  Pizza.model.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        crust: request.body.crust,
        cheese: request.body.cheese,
        sauce: request.body.sauce,
        toppings: request.body.sauce
      }
    },
    (error, data) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(request.body);
    }
  );
});

module.exports = router;

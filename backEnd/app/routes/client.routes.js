module.exports = app => {
  const clients = require("../controllers/client.controller.js");

  var router = require("express").Router();

  // Create a new Client
  router.post("/", clients.create);

  // Retrieve all Clients
  router.get("/", clients.findAll);

  // Retrieve all highPriority Clients
  router.get("/highPriority", clients.findAllHighPriority);

  // Retrieve a single Client with id
  router.get("/:id", clients.findById);

  // Update a Client with id
  router.put("/:id", clients.update);

  // Add a Product to a Client
  router.post("/addProduct", clients.addProduct);

  // Delete a Client with id
  router.delete("/:id", clients.delete);

  // Create a new Client
  router.delete("/", clients.deleteAll);

  app.use("/api/clients", router);
};

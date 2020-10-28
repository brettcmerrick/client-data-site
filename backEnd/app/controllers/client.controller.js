const db = require("../models");
const Client = db.clients;
const Product = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Client
  const client = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    // productIds: req.body.productIds,
    highPriority: req.body.highPriority ? req.body.highPriority : false
  };

  // Save Client in the database
  Client.create(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client."
      });
    });
};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
 // const firstName = req.query.firstName;
  //var condition = firstName ? { firstName: { [Op.iLike]: `%${firstName}%` } } : null;

  Client.findAll({
    include: [
      {
        model: Product,
        as: "products",
        attributes: ["name","price"],
        through: {
          attributes: [], //DOES IT NEED UPDATING??
        },
      },
    ],
   // where: {firstName: { [Op.iLike]: `%${firstName}%` }}
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clients."
      });
    });
};

// Find a single Client with an id
exports.findById = (req, res) => {
  const id = req.params.id;

  Client.findByPk(id, {
    include: [
      {
        model: Product,
        as: "products",
        attributes: ["id", "name", "price"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Client with id=" + id
      });
    });
};

// Add a product to a Client
exports.addProduct = (req, res) => {
  const clientId = req.body.client;
  const productId = req.body.product;

  return Client.findByPk(clientId)
  .then((clientData) => {
    if (!clientData) {
      console.log("Client not found!");
      return null;
    }
    return Product.findByPk(productId)
    .then((productData) => {
      if (!productData) {
        console.log("Product not found!");
        return null;
      }

      clientData.addProduct(productData);
      console.log(`Added Product id=${productData.id} to Client id=${clientData.id}`);
      res.send(clientData);
      });
    })
  .catch((err) => {
    res.status(500).send({
      message: `Error adding Product to Client: + ${err}`
    });
  });
};

// Update a Client by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Client.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Client was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Client with id=" + id
      });
    });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Client.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Client was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Client with id=" + id
      });
    });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
  Client.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Clients were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all clients."
      });
    });
};

// find all highPriority Client
exports.findAllHighPriority = (req, res) => {
  Client.findAll({ where: { highPriority: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clients."
      });
    });
};

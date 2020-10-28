const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const ClientController = require("./app/controllers/client.controller");
// const ProductController = require("./app/controllers/product.controller");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// const run = async () => {
//   const client1 = await ClientController.create({
//     "firstName": "Albert",
//     "lastName": "Zeblinski",
//     "address": "123 Alpha Dr",
//     "city": "Aspen",
//     "state": "Al",
//     "highPriority": false
//   });

//   const product1 = await ProductController.create({
//     name: "Product #1",
//     price: 50
//   });

//   await ClientController.addProduct(tag1.id, tut1.id);

// };

const db = require("./app/models");
// db.sequelize.sync();
// drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  // run();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bmerrick application." });
});

require("./app/routes/client.routes")(app);
require("./app/routes/product.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

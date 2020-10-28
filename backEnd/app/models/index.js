const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.clients = require("./client.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);

db.products.belongsToMany(db.clients,{
  through: "clients_products",
  as: "clients",
  foreignKey: "products_id",
});
db.clients.belongsToMany(db.products, {
  through: "clients_products",
  as: "products",
  foreignKey: "clients_id",
});

module.exports = db;

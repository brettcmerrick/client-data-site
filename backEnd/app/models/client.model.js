module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("clients", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    // productIds: {
    //   type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: null
    // },
    highPriority: {
      type: Sequelize.BOOLEAN
    }
  });

  return Client;
};

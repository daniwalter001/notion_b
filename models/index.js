const { sequelize } = require("../db.js");

const { defineTaskModel } = require("./TaskModel");

const initModels = () => {
  //creation des models

  defineTaskModel(sequelize);

  //synchronisation des models
  sequelize
    .sync({})
    // .sync({ alter: true })
    // .sync({ force: true })
    .then(async () => {
      console.log("sync successfull");

      console.log("Initial data added...");
    })
    .catch((err) => {
      console.log(err);
      console.log("sync failed");
    });
};

module.exports = { initModels };

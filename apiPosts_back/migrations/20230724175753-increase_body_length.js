"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn("posts", "body", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.changeColumn("posts", "body", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user",
      [
        {
          username: "johndoe",
          email: "johndoe@gmail.com",
          password: "johndoe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "janedoe",
          email: "janedoe@gmail.com",
          password: "janedoe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user", null, {});
  },
};

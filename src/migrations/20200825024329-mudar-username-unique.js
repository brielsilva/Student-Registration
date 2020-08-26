'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.changeColumn(
    'users',
    'username',
    {
      type: Sequelize.STRING,
      allowNull: false,
      unique:true
    }
    )
   
  ,

  down: () => {}
};

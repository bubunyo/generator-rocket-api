import Sequelize from 'sequelize';
import Random from 'meteor-random';

import constants, { isTest, isDev } from './constants';

const sequelize = new Sequelize({
  storage: './.db/database.sqlite'
  dialect: 'sqlite',
  operatorsAliases: false,

  define: {
    freezeTableName: true,
    hooks: {
      beforeCreate: (model) => {
        model.id = Random.id();
      },
    },
  },
  logging: isDev(),
});


sequelize.authenticate()
  .then(() => {
    if (!isTest()) { console.log('Connection has been established successfully.'); }
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;

import Sequelize from 'sequelize';
import sequelize from '../../db';

// Refer to http://docs.sequelizejs.com/manual/models-definition.html
// on how to define your model

const <%= module %> = sequelize.define('<%= table %>', {
  id: { type: Sequelize.STRING, primaryKey: true },

  //other model attributes go here

});

<%= module %>.prototype.toJson = function toJson() {
  return {
    ...this.get({ plain: true }),
  };
};


export default <%= module %>;

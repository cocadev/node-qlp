
import Sequelize from 'sequelize';
import model_user from '../model/user.model.js'

import * as ENV from './env'

const sequelize = new Sequelize(ENV.DATABASE, ENV.USERNAME, ENV.PASSWORD, {
  host:             ENV.HOST,
  dialect:          ENV.DIALECT,
  operatorsAliases: false,
  pool:             ENV.POOL
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = model_user(sequelize, Sequelize);



module.exports = db;
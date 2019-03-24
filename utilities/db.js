const Sequelize = require('sequelize');
const sequelize = new Sequelize('mitron', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});
/**
 * 
 */
const Device = sequelize.define('device', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  uuid: Sequelize.STRING
});
/**
 * 
 */
const Speech  = sequelize.define('speech', {
    title: Sequelize.STRING,
    content: Sequelize.STRING(1000),
    uuid: Sequelize.STRING
  });
// Creates table if not exists, if it is true, deletes the ta 
Device.sync({force: false});
Speech.sync({force: false});


module.exports = {Device,Speech};

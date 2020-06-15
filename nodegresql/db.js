const Sequelize = require('sequelize');
// your credentials
// DATABASE_URL = 'postgres://[db-user]:[password]@address:port/database-name';
//DATABASE_URL = process.env.DATABASE_URL;
DATABASE_URL = 'postgres://postgres:admin@localhost:5432/NodeAPI';
const sequelize = new Sequelize(DATABASE_URL);


module.exports = sequelize;

//set DATABASE_URL=postgres://postgres:admin@localhost:5432/NodeAPI
//set SECRET=123456789

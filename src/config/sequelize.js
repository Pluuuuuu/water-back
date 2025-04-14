const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: false,
  }
);

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,  // Aiven MySQL Host
//   dialect: 'mysql',  // MySQL dialect for Sequelize
//   logging: false,  // Set to true for debugging
//   dialectOptions: {
//     ssl: {
//       rejectUnauthorized: false,  // Aiven requires SSL connections
//     },
//   },
// }
// {
//   host: process.env.DB_HOST,
//   dialect: 'mysql',
//
// );
module.exports = sequelize;

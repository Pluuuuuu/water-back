require("dotenv").config();

module.exports = {
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST, // ← from Railway
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
  },
};

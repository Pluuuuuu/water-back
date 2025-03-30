const { sequelize } = require('./db');

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); // Use { alter: true } to avoid data loss
    // { force: true } → Drops existing tables and recreates them (useful for development).
    // { alter: true } → Modifies existing tables without data loss.

    console.log('Database synchronized successfully!');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
}

syncDatabase();

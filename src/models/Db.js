import { Sequelize } from 'sequelize';
const sequelize = new Sequelize(process.env.DATABASE_URI, {
  dialect: 'postgres',
  protocol: 'postgres', // Required for some cloud providers
  dialectOptions: {
    ssl: {
      require: true, // Use SSL for secure connections
      rejectUnauthorized: false, // Required for some cloud providers
    },
  },
  
});

export default sequelize;
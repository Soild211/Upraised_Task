import sequelize from './Db.js';
import gadget from './gadget.model.js'; 
import user from './user.model.js';

const models = {
  gadget, 
  user
};

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); 
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};


const connectDb = async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Connection has been established successfully.');

    await syncDatabase(); 
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDb;
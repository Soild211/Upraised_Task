import sequelize from "./Db.js";
import { DataTypes } from 'sequelize';

const user = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull:false,
    unique: true,
    primaryKey:true
  },
  password : {
    type: DataTypes.STRING,
    unique:false,
    allowNull:false
  }
});

export default user;
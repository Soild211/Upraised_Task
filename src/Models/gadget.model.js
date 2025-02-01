import sequelize from "./Db.js";
import { DataTypes } from 'sequelize';

const gadget = sequelize.define('Gadget', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codename: {
    type: DataTypes.STRING,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'),
    defaultValue: 'Available',
  },
  decommissionedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default gadget;
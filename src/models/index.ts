import { Dialect, Sequelize } from "sequelize";
import config from "../config/db.config";
import Role, { ROLES } from "./role.model";
import User from "./user.model";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect as Dialect,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {
  sequelize: sequelize,
  ROLES: ROLES,
};

// User table
User.init(User.getSchema(), {
  tableName: "users",
  sequelize,
});

// Role table
Role.init(Role.getSchema(), {
  tableName: "roles",
  sequelize,
});

// User <--> Role relationship
User.belongsToMany(Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
Role.belongsToMany(User, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

export default db;

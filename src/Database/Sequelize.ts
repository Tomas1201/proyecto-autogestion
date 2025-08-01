import { Sequelize } from "sequelize";

export const sequelizedb = new Sequelize("PAPU", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
  port: 3306,
});

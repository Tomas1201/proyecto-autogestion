import { Sequelize } from "sequelize";

export const sequelizedb = new Sequelize("PAPU", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
  logging: console.log,
  port: 5432,
});

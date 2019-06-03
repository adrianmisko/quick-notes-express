import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
    database: "quick_notes",
    dialect: "postgres",
    models: [__dirname + "/models"],
    operatorsAliases: Op,
});

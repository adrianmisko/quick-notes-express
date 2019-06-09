import dotenv from "dotenv";
import { createServer } from "http";
import { app } from "./app";
import createMockData from "./mock/mockData";
import { sequelize } from "./sequelize";

dotenv.config();

const port = process.env.PORT || 8080;

(async () => {
    await sequelize.sync();
    // await createMockData();
    createServer(app).listen(port, () => console.info(`Server running on port ${port}`));
})();

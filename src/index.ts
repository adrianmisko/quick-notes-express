import dotenv from "dotenv";
import express from "express";
import path from "path";

import { sequelize } from "./sequelize";

dotenv.config();

const port = process.env.SERVER_PORT;

sequelize.sync({ force: true });

const app = express();

app.get("/", (req: any, res: any) => {
    res.render("index");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
});

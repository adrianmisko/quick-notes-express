import * as bodyParser from "body-parser";
import express from "express";
import path from "path";
import errorhandler from "strong-error-handler";
import {auth} from "./routes/auth";
import { users } from "./routes/users";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "5mb" }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type,authorization");

    next();
});

app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(errorhandler({
    debug: process.env.ENV !== "prod",
    log: true,
}));


export { app };

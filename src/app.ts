import * as bodyParser from "body-parser";
import express from "express";
import path from "path";
import errorhandler from "strong-error-handler";
import { notes } from "./routes/notes";

const app = express();

// middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "5mb" }));

// enable corse for all origins
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type,authorization");

    next();
});

app.get("/", (request, response) => {
    response.redirect("/notes");
});
app.use("/notes", notes);

app.use(errorhandler({
    debug: process.env.ENV !== "prod",
    log: true,
}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

export { app };

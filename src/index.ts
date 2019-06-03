import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();

// define a route handler for the default home page
app.get("/", (req: any, res: any) => {
    res.render("index");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});

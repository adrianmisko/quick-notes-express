import express from "express";
import path from "path";

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", (req: any, res: any) => {
    res.render( "index" );
});

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});

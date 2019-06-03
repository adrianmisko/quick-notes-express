import { Router } from "express";
import Note from "../models/Note";

const notes = Router();

notes.get("/", (request: any, response: any) => {
    response.render("index");
});

notes.get("/:id", async (request, response) => {
   response.json(await Note.findByPk(request.params.id));
});

export { notes };

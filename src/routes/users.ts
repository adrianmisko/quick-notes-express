import { Router } from "express";
import Note from "../models/Note";
import User from "../models/User";

const users = Router();

users.get("/:userId/notes", async (request, response) => {
    const user = await User.scope("withNotes").findByPk(request.params.userId);
    if (user == null) {
        response.sendStatus(404);
    } else {
        response.json(user.notes);
    }
});

users.get("/:userId/notes/:id", async (request, response) => {
   const note = await Note.findByPk(request.params.id);
   if (note == null) {
       response.sendStatus(404);
   } else {
       response.json(note);
   }
});

users.post("/:userId/notes", async (request, response, next) => {
    try {
        await Note.create(request.body);
        response.sendStatus(201);
    } catch (e) {
        next(e);
    }
});

export { users };

import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import Note from "../models/Note";
import User from "../models/User";

const users = Router();

async function verifyUser(request: any, response: Response, next: NextFunction) {
    const token = request.headers.authorization;
    if (!token) {
        response.sendStatus(403);
    } else {
        jwt.verify(token, "secretkey", async (err: any, tokenUser: User) => {
            if (err) {
                response.sendStatus(403);
            } else {
                const resourceOwner = await User.findByPk(request.params.userId);
                if (tokenUser.email === resourceOwner.email) {
                    request.user = resourceOwner;
                    next();
                } else {
                    response.sendStatus(403);
                }
            }
        });
    }
}

users.get("/:userId/notes", verifyUser , async (request, response) => {
    const user = await User.scope("withNotes").findByPk(request.params.userId);
    if (user == null) {
        response.sendStatus(404);
    } else {
        response.json(user.notes);
    }
});

users.get("/:userId/notes/:id", verifyUser, async (request, response) => {
   const note = await Note.findByPk(request.params.id);
   if (note == null) {
       response.sendStatus(404);
   } else {
       response.json(note);
   }
});

users.post("/:userId/notes", verifyUser, async (request, response, next) => {
    try {
        const note = await Note.create({ ...request.body, userEmail: request.params.userId });
        response.status(201).json(note);
    } catch (e) {
        next(e);
    }
});

users.delete("/:userId/notes/:noteId", async (request, response, next) => {
    try {
        await Note.findByPk(request.params.noteId).then((note) => note.destroy());
        response.sendStatus(200);
    } catch (e) {
        next(e);
    }
});

users.put("/:userId/notes/:noteId", verifyUser, async (request, response, next) => {
    try {
        await Note.findByPk(request.params.noteId).then((note) => note.update(request.body));
        response.sendStatus(200);
    } catch (e) {
        next(e);
    }
});

export { users };

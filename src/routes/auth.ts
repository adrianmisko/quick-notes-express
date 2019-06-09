import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const auth = Router();

auth.post("/token", async (request, response) => {
    const user = await User.findByPk(request.body.email);
    if (!user) {
        response.sendStatus(403);
    }
    const passwordIsValid =  await user.checkPassword(request.body.password);
    if (!passwordIsValid) {
        response.sendStatus(403);
    } else {
        // @ts-ignore
        jwt.sign(user.dataValues, "secretkey", { expiresIn: "30min" }, (err, token) => {
            // @ts-ignore
            response.json({token, ...user.dataValues});
        });
    }
});

auth.post("/register", async (request, response, next) => {
    try {
        for (const key in request.body) {
            if (request.body.hasOwnProperty(key) && !request.body[key]) {
                response.sendStatus(401);
            }
        }
        await User.create({ ...request.body, passwordHash: request.body.password });
        response.sendStatus(201);
    } catch (e) {
        response.sendStatus(401);
    }
});

export { auth };

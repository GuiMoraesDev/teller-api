import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import SessionsController from "../controllers/SessionsController";
const sessionController = new SessionsController();

const sessionsRouter = Router();

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create
);

export default sessionsRouter;

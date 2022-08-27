import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import SessionsController from "../controllers/SessionsController";
import GoogleSessionsController from "../controllers/GoogleSessionsController";
const sessionController = new SessionsController();
const googleSessionsController = new GoogleSessionsController();

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

sessionsRouter.post(
  "/google",
  celebrate({
    [Segments.BODY]: {
      credential: Joi.string().required(),
    },
  }),
  googleSessionsController.create
);

export default sessionsRouter;

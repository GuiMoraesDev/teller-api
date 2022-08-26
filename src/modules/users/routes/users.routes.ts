import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import UsersController from "../controllers/UsersController";
const userController = new UsersController();

const usersRouter = Router();

usersRouter.post(
  "/new",
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create
);

export default usersRouter;

import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '../controllers/UsersController';
import UsersGoogleController from '../controllers/UsersGoogleController';

const userController = new UsersController();
const usersGoogleController = new UsersGoogleController();

const usersRouter = Router();

usersRouter.post(
	'/new',
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

usersRouter.post(
	'/new-google',
	celebrate({
		[Segments.BODY]: {
			credential: Joi.string().required(),
		},
	}),
	usersGoogleController.create
);

export default usersRouter;

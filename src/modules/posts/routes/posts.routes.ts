import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import PostsController from '../controllers/PostsController';
import ensureAuthenticated from '../../users/middlewares/ensureAuthenticated';
const postsController = new PostsController();

const postsRouter = Router();

postsRouter.get(
	'/',
	ensureAuthenticated,
	postsController.list
);

postsRouter.get(
	'/:author_id',
	celebrate({
		[Segments.PARAMS]: {
			author_id: Joi.string().required(),
		},
	}),
	ensureAuthenticated,
	postsController.list
);

postsRouter.post(
	'/new',
	celebrate({
		[Segments.BODY]: {
			body: Joi.string().required(),
			author_id: Joi.string().required(),
		},
	}),
	ensureAuthenticated,
	postsController.create
);

export default postsRouter;

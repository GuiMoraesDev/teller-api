import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import PostsController from '../controllers/PostsController';
const postsController = new PostsController();

const postsRouter = Router();

postsRouter.get(
	'/:author_id',
	celebrate({
		[Segments.PARAMS]: {
			author_id: Joi.string().required(),
		},
	}),
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
	postsController.create
);

export default postsRouter;

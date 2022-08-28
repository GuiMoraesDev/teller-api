import { Request, Response } from 'express';

import ListAllPostsService from '../services/ListAllPostsService';
import CreateNewPostService from '../services/CreateNewPostService';
const listAllPostsService = new ListAllPostsService();
const createNewPostService = new CreateNewPostService();

export default class PostsController {
	public async list(request: Request, response: Response): Promise<void> {
		const { author_id } = request.params;

		try {
			const { posts } = await listAllPostsService.execute({
				author_id,
			});

			response.status(200).json(posts);
		} catch (error: any) {
			response.status(400).json({ message: error.message });
		}
	}

	public async create(request: Request, response: Response): Promise<void> {
		const { body, author_id } = request.body;

		try {
			const { post } = await createNewPostService.execute({
				body,
				author_id,
			});

			response.status(200).json({ post });
		} catch (error: any) {
			response.status(400).json({ message: error.message });
		}
	}
}

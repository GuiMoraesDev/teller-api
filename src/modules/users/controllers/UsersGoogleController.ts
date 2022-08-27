import { Request, Response } from 'express';

import CreateUserGoogleService from '../services/CreateUserGoogleService';
const createUserGoogleService = new CreateUserGoogleService();

export default class UsersGoogleController {
	public async create(request: Request, response: Response): Promise<void> {
		const { credential } = request.body;

		try {
			const { user } = await createUserGoogleService.execute({
				credential,
			});

			response.status(200).json({ user });
		} catch (error: any) {
			response.status(400).json({ message: error.message });
		}
	}
}

import { Request, Response } from 'express';

import CreateNewUserService from '../services/CreateNewUserService';
const createNewUserService = new CreateNewUserService();

export default class UsersController {
	public async create(request: Request, response: Response): Promise<void> {
		const { first_name, last_name, email, password } = request.body;

		try {
			const { user, token } = await createNewUserService.execute({
				first_name,
				last_name,
				email,
				email_verified: false,
				is_social_login: false,
				password,
				avatar_url: null,
			});

			response.status(200).json({ user, token });
		} catch (error: any) {
			response.status(400).json({ message: error.message });
		}
	}
}

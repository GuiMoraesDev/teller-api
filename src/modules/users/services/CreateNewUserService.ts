import supabaseClient from '../../../shared/providers/supabase/client';

import { User, UserParams } from '../dtos/users';

export default class CreateNewUserService {
	private readonly supabaseClient = supabaseClient;

	public async execute(userProps: UserParams): Promise<User> {
		const { email } = userProps;

		const isUserAlreadyCreated = await this.getUser(email);

		if (isUserAlreadyCreated) {
			throw new Error('This email already exists');
		}

		const user = await this.createNewUser(userProps);

		if (user == null) {
			throw new Error('Something goes wrong while user creation');
		}

		return user;
	}

	private async getUser(email: string): Promise<boolean> {
		const result = await this.supabaseClient
			.from<User>('Users')
			.select(`id`)
			.eq('email', email)
			.single();

		return !(result.data == null);
	}

	private async createNewUser(userProps: UserParams): Promise<User> {
		const result = await this.supabaseClient
			.from<User>('Users')
			.insert(userProps)
			.single();

		if (!result.data) {
			throw new Error('Something went wrong while user creation');
		}

		return result.data;
	}
}

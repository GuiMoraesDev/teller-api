import bcrypt from 'bcryptjs';

import supabaseClient from '../../../shared/providers/supabase/client';

import { User, UserParams } from '../dtos/users';

import TokenProvider from '../providers/TokenProvider';

interface Response {
	user: User;
	token: string;
}

export default class CreateNewUserService {
	private readonly tokenProvider = new TokenProvider();
	private readonly supabaseClient = supabaseClient;

	public async execute(userProps: UserParams): Promise<Response> {
		const { email } = userProps;

		const isUserAlreadyCreated = await this.getUser(email);

		if (isUserAlreadyCreated) {
			throw new Error('This email already exists');
		}

		const user = await this.createNewUser(userProps);

		if (user == null) {
			throw new Error('Something goes wrong while user creation');
		}

		delete user.password;

		const token = this.getUserToken(user);

		if (!token) throw new Error('Error trying to create user token');

		return {
			user,
			token,
		};
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
		const { password } = userProps;

		if (!password) {
			throw new Error('password can not be null');
		}

		const encryptedPass = await bcrypt.hash(password, 8);

		const result = await this.supabaseClient
			.from<User>('Users')
			.insert({ ...userProps, password: encryptedPass })
			.select('id,first_name,last_name,email,email_verified,password,avatar_url')
			.single();

		if (!result.data) {
			throw new Error('Something went wrong while user creation');
		}

		return result.data;
	}

	private getUserToken(user: User): string | null {
		const token = this.tokenProvider.generateToken({}, user.id);

		return token;
	}
}

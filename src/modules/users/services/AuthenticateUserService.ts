import bcrypt from 'bcryptjs';

import { User } from '../dtos/users';

import TokenProvider from '../providers/TokenProvider';

import supabaseClient from '../../../shared/providers/supabase/client';

interface Request {
	email: string;
	password: string;
}

interface Response {
	user: User;
	token: string;
}

export default class AuthenticateUserService {
	private readonly tokenProvider = new TokenProvider();
	private readonly supabaseClient = supabaseClient;

	public async execute({ email, password }: Request): Promise<Response> {
		const user = await this.getUser(email);

		if (!user?.password) {
			throw new Error('email or password is not valid');
		}

		const isPassValid = await bcrypt.compare(password, user.password);

		if (!isPassValid) {
			throw new Error('email or password is not valid');
		}

		delete user.password;

		const token = this.getUserToken(user);

		if (!token) throw new Error('Error trying to create user token');

		return {
			user,
			token,
		};
	}

	private getUserToken(user: User): string | null {
		const token = this.tokenProvider.generateToken({}, user.id);

		return token;
	}

	private async getUser(email: string): Promise<User | null> {
		const result = await this.supabaseClient
			.from<User>('users')
			.select('id,first_name,last_name,email,email_verified,password,avatar_url')
			.eq('email', email)
			.eq('is_social_login', false)
			.single();

		return result.data;
	}
}

import jwt from 'jwt-decode';

import { User } from '../dtos/users';

import TokenProvider from '../providers/TokenProvider';

import supabaseClient from '../../../shared/providers/supabase/client';
import { GoogleUserResponse } from '../../../@types';

interface Request {
	credential: string;
}

interface Response {
	user: User;
	token: string;
}

class AuthenticateGoogleUserService {
	private readonly tokenProvider = new TokenProvider();
	private readonly supabaseClient = supabaseClient;

	public async execute({ credential }: Request): Promise<Response> {
		const { email } = this.decodeCredential(credential);

		const user = await this.getUser(email);

		if (!user) {
			throw new Error('email not found');
		}

		const token = this.getUserToken(user);

		if (!token) throw new Error('Error trying to create user token');

		return {
			user,
			token,
		};
	}

	private decodeCredential(jwtCredential: string): GoogleUserResponse {
		const result = jwt<GoogleUserResponse>(jwtCredential);

		return result;
	}

	private async getUser(email: string): Promise<User | null> {
		const result = await this.supabaseClient
			.from<User>('Users')
			.select(`id, email, first_name, last_name, password`)
			.eq('email', email)
			.single();

		return result.data;
	}

	private getUserToken(user: User): string | null {
		const token = this.tokenProvider.generateToken({}, user.id);

		return token;
	}
}

export default AuthenticateGoogleUserService;

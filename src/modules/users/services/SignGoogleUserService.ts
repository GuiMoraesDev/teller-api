import jwt from 'jwt-decode';

import { User, UserParams } from '../dtos/users';

import TokenProvider from '../providers/TokenProvider';

import supabaseClient from '../../../shared/providers/supabase/client';

import { GoogleUserResponse } from '../../../@types';
import CreateNewUserService from './CreateNewUserService';

interface Request {
	credential: string;
}

interface Response {
	user: User;
	token: string;
}

export default class SignGoogleUserService {
	private readonly createNewUserService = new CreateNewUserService();
	private readonly tokenProvider = new TokenProvider();
	private readonly supabaseClient = supabaseClient;

	public async execute({ credential }: Request): Promise<Response> {
		const { email, ...userProps } = this.decodeCredential(credential);

		let user = await this.getUser(email);

		if (!user) {
			user = await this.createNewUserService.execute({ email, ...userProps });
		}

		const token = this.getUserToken(user);

		if (!token) throw new Error('Something went wrong while user token creation');

		return {
			user,
			token,
		};
	}

	private decodeCredential(jwtCredential: string): UserParams {
		const {
			given_name: first_name,
			family_name: last_name,
			email,
			picture: avatar_url,
		} = jwt<GoogleUserResponse>(jwtCredential);

		const response: UserParams = {
			first_name,
			last_name,
			email,
			email_verified: false,
			is_social_login: true,
			password: null,
			avatar_url,
		};

		return response;
	}

	private async getUser(email: string): Promise<User | null> {
		const result = await this.supabaseClient
			.from<User>('Users')
			.select('id,first_name,last_name,email,email_verified,avatar_url')
			.eq('email', email)
			.eq('is_social_login', true)
			.single();

		return result.data;
	}

	private getUserToken(user: User): string | null {
		const token = this.tokenProvider.generateToken({}, user.id);

		return token;
	}
}

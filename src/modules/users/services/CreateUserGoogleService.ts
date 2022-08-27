import jwt from 'jwt-decode';
import { GoogleUserResponse } from '../../../@types';

import supabaseClient from '../../../shared/providers/supabase/client';

import { User } from '../dtos/users';

interface Request {
	credential: string;
}

interface CreateUserProps {
	first_name: string;
	last_name: string;
	email: string;
}

interface Response {
	user: User;
}

class CreateUserGoogleService {
	private readonly supabaseClient = supabaseClient;

	public async execute({ credential }: Request): Promise<Response> {
		const {
			given_name: first_name,
			family_name: last_name,
			picture,
			email,
		} = this.decodeCredential(credential);

		const user = await this.createNewUser({
			first_name,
			last_name,
			email,
		});

		if (user === null) {
			throw new Error('Something goes wrong while user creation');
		}

		user.avatar_url = picture;

		return { user };
	}

	private decodeCredential(jwtCredential: string): GoogleUserResponse {
		const result = jwt<GoogleUserResponse>(jwtCredential);

		return result;
	}

	private async createNewUser(
		userProps: CreateUserProps
	): Promise<User | null> {
		const { first_name, last_name, email } = userProps;

		const result = await this.supabaseClient
			.from<User>('Users')
			.insert({ first_name, last_name, email })
			.single();

		return result.data;
	}
}

export default CreateUserGoogleService;

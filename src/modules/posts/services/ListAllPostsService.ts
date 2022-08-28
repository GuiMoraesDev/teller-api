import supabaseClient from '../../../shared/providers/supabase/client';
import { User } from '../../users/dtos/users';

import { Post, PostParams } from '../dtos/posts';

interface Params {
	author_id: PostParams['author_id'];
}

interface AllPostsProps extends Post {
	Users: {
		id: User['id'];
		first_name: User['first_name'];
		last_name: User['last_name'];
		avatar_url: User['avatar_url'];
	};
}

interface Response {
	posts: AllPostsProps[];
}

export default class ListAllPostsService {
	private readonly supabaseClient = supabaseClient;

	public async execute({ author_id }: Params): Promise<Response> {
		const posts = await this.listAllPost(author_id);

		return { posts };
	}

	private async listAllPost(
		author_id: PostParams['author_id']
	): Promise<AllPostsProps[]> {
		const result = await this.supabaseClient
			.from<AllPostsProps>('Posts')
			.select(
				`
			id,
			body,
			created_at,
			author_id,
			Users (
				id,
				first_name,
				last_name,
				avatar_url
			)
			`
			)
			.eq('author_id', author_id);

		if (!result.data) {
			throw new Error('Something went wrong while post listing');
		}

		return result.data;
	}
}

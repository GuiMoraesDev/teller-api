import supabaseClient from '../../../shared/providers/supabase/client';

import { Post, PostParams } from '../dtos/posts';

interface Response {
	post: Post;
}

export default class CreateNewPostService {
	private readonly supabaseClient = supabaseClient;

	public async execute(postProps: PostParams): Promise<Response> {
		const post = await this.createNewPost(postProps);

		return { post };
	}

	private async createNewPost(postProps: PostParams): Promise<Post> {
		const result = await this.supabaseClient
			.from<Post>('posts')
			.insert(postProps)
			.select('*')
			.single();

		if (!result.data) {
			throw new Error('Something went wrong while post creation');
		}

		return result.data;
	}
}

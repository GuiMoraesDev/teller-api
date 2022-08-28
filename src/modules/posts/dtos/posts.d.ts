export interface Post {
	id: string;
	body: string;
	author_id: string;
	created_at: Date;
}

export interface PostParams {
	body: string;
	author_id: string;
}

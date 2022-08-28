export interface User {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	email_verified: boolean;
	is_social_login: boolean;
	password?: string | null;
	avatar_url: string | null;
	created_at: Date;
}

export interface UserParams {
	first_name: string;
	last_name: string;
	email: string;
	email_verified: boolean;
	is_social_login: boolean;
	password: string | null;
	avatar_url: string | null;
}

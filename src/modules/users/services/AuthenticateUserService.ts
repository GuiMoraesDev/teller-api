import supabaseClient from "../../../shared/providers/supabase/client";
import { User } from "../dtos/users";
import TokenProvider from "../providers/TokenProvider";

interface Request {
  email: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  private tokenProvider = new TokenProvider();
  private supabaseClient = supabaseClient;

  public async execute({ email }: Request): Promise<Response> {
    const user = await this.getUser(email);

    const token = this.getUserToken(user);

    if (!token) throw new Error("Error trying to create user token");

    return {
      user,
      token,
    };
  }

  private getUserToken(user: User): string | null {
    const token = this.tokenProvider.generateToken({}, user.id);

    return token;
  }

  private async getUser(email: string) {
    const result = await this.supabaseClient
      .from<User>("Users")
      .select(`id, email, first_name, last_name`)
      .eq("email", email)
      .single();
    
    if (!result.data) throw new Error("User not found.");

    return result.data;
  }
}

export default AuthenticateUserService;

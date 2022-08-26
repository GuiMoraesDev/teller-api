import bcrypt from "bcryptjs";

import supabaseClient from "../../../shared/providers/supabase/client";

import { User } from "../dtos/users";

interface Request {
  first_name: string
  last_name: string
  email: string
  password: string
}

interface Response {
  user: User
}

class CreateUserService {
  private readonly supabaseClient = supabaseClient;

  public async execute(userProps: Request): Promise<Response> {
    const { email } = userProps;
    const isUserAlreadyCreated = await this.getUser(email);

    if (isUserAlreadyCreated) {
      throw new Error("This email already exist on database");
    }

    const user = await this.createNewUser(userProps);

    if (user == null) {
      throw new Error("Something goes wrong while user creation");
    }

    return { user };
  }

  private async getUser(email: string): Promise<boolean> {
    const result = await this.supabaseClient
      .from<User>("Users")
      .select(`id`)
      .eq("email", email)
      .single();

    return !(result.data == null);
  }

  private async createNewUser(userProps: Request): Promise<User | null> {
    const { first_name, last_name, email, password: userPass } = userProps;

    const encryptedPass = await bcrypt.hash(userPass, 8);

    const result = await this.supabaseClient
      .from<User>("Users")
      .insert({ first_name, last_name, email, password: encryptedPass })
      .single();

    return result.data;
  }
}

export default CreateUserService;

import { Request, Response } from "express";
import { User } from "../dtos/users";

import CreateUserService from "../services/CreateUserService";
const createUserService = new CreateUserService();

export default class UsersController {
  public async create(request: Request, response: Response): Promise<void> {
    const { first_name, last_name, email, password } = request.body;

    try {
      const { user } = await createUserService.execute({
        first_name,
        last_name,
        email,
        password,
      });

      const user_authenticated: User = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      };

      response.status(200).json({ user: user_authenticated });
    } catch (error: any) {
      response.status(400).json({ message: error.message });
    }
  }
}

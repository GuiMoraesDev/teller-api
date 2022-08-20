import { Request, Response } from "express";
import { User } from "../dtos/users";
import AuthenticateUserService from "../services/AuthenticateUserService";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const authenticateUser = new AuthenticateUserService();

    try {
      const { user, token } = await authenticateUser.execute({
        email,
      });

      const user_authenticated: User = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      };

      return response.status(200).json({ user: user_authenticated, token });
    } catch (error: any) {
      return response.status(401).json({ message: error.message });
    }
  }
}

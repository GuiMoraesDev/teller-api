import { Request, Response } from "express";

import AuthenticateUserService from "../services/AuthenticateUserService";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService();

    try {
      const { user, token } = await authenticateUser.execute({
        email,
        password
      });

      response.status(200).json({ user, token });
    } catch (error: any) {
      response.status(401).json({ message: error.message });
    }
  }
}

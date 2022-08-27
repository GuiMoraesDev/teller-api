import { Request, Response } from "express";

import { User } from "../dtos/users";

import AuthenticateGoogleUserService from '../services/AuthenticateGoogleUserService';
const authenticateGoogleUserService = new AuthenticateGoogleUserService();

export default class GoogleSessionsController {
  public async create(request: Request, response: Response): Promise<void> {
    const { credential } = request.body;

    try {
      const { user, token } = await authenticateGoogleUserService.execute({
        credential,
      });

      const user_authenticated: User = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      };

      response.status(200).json({ user: user_authenticated, token });
    } catch (error: any) {
      response.status(400).json({ message: error.message });
    }
  }
}

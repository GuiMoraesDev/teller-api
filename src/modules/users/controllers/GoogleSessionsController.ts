import { Request, Response } from "express";

import SignGoogleUserService from '../services/SignGoogleUserService';
const signGoogleUserService = new SignGoogleUserService();

export default class GoogleSessionsController {
  public async create(request: Request, response: Response): Promise<void> {
    const { credential } = request.body;

    try {
      const { user, token } = await signGoogleUserService.execute({
        credential,
      });

      response.status(200).json({ user, token });
    } catch (error: any) {
      response.status(400).json({ message: error.message });
    }
  }
}

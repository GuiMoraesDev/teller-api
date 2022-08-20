import { Router, Request, Response } from "express";
import SessionsController from "../controllers/SessionsController";

const route = Router();

route.post("/sessions", (req: Request, res: Response) => {
  const sessionController = new SessionsController();

  const session = sessionController.create(req, res);
});

export default route;

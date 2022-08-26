import { errors } from "celebrate";
import { Express } from "express";

import sessionsRoutes from "./modules/users/routes/sessions.routes";
import usersRoutes from "./modules/users/routes/users.routes";

const routes = (app: Express): void => {
  app.get("/status", (_, res) => res.json({ status: "OK" }));

  app.use("/sessions", sessionsRoutes);

  app.use("/users", usersRoutes);

  app.use(
    errors()
  );
};

export default routes;

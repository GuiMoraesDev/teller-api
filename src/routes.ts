import { Express } from "express";

import usersRoutes from "./modules/users/routes/users.routes";

const routes = (app: Express) => {
  app.get("/status", (req, res) => res.json({ status: "OK" }));

  app.use("/users", usersRoutes);
};

export default routes;

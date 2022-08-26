import express from "express";

import routes from "./routes";

const app = express();

app.use(express.json());

routes(app);

app.use(express.static('./public'));

export default app;

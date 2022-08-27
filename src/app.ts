import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(express.json());

app.use(cors());

routes(app);

app.use(express.static('./public'));

export default app;

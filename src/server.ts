import "dotenv/config";

import app from "./app";

const port = process.env.PORT ?? 3333;

app.listen(port, () => "🖥️ server running on port 3333");

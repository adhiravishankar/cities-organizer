import express from 'express';

import router from './routes/cities';

const app = express();
app.use(router);

const port = 7002;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

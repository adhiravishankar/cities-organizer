import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import router from './routes/cities';

dotenv.config();

const mongooseClient = new mongoose.Mongoose();
// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
mongooseClient.connect(process.env.MONGODB_URL).catch((error) => {
  console.log(error);
});



const app = express();
app.use(router);

const port = 7002;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

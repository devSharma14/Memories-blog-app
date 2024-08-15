import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import serverless from 'serverless-http';

import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';

// Initialize app
const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());

app.use("/",(req,res)=> {
  res.send("Server is successfully deployed");
});
app.use('/posts' , postRoutes);
app.use('/user', userRouter);

const CONNECTION_URL = 'mongodb+srv://devs140124:24uRXg8pXEfPTRp9@cluster0.cy5ubvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
.then(() => {
  console.log(`Server running on port: ${PORT}`);
})
.catch((error) => console.log(error.message));

// Export the app as a serverless function
export const handler = serverless(app);

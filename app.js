import express from "express";
import { PORT} from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";

const app = express();
const port = PORT

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
    res.send("Welcome to my subscription api");
})

app.listen(port, async () => {
    console.log(`Listening on port http://localhost:${port}`);

    await connectToDatabase()
    console.log('Connected to database')
})

export default app;

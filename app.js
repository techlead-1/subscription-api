import express from "express";
import { PORT} from "./config/env.js";

const app = express();
const port = PORT

app.get('/', (req, res) => {
    res.send("Weclome to my subscription api");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

export default app;

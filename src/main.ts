import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import { configDotenv } from "dotenv";

configDotenv()

 const app = express();
app.use(cors());
const PORT = process.env.port || 8081;

app.use(router);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import { configDotenv } from "dotenv";
import { ConnectOptions, connect  } from "mongoose";
import bodyParser from "body-parser";

// .env
configDotenv();

// init MongoDB
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

// init express App
const app = express();

app.use(cors());

app.use(bodyParser.json());

const PORT = process.env.port || 8081;

// init routes
app.use(router);

// init the app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

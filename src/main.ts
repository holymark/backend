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

const corsOptions = {
  origin: 'https://5173-idx-learnlyapp-comerce-1721181347524.cluster-4ezwrnmkojawstf2k7vqy36oe6.cloudworkstations.dev', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(bodyParser.json());

const PORT = process.env.port || 8081;

// init routes
app.use(router);

// init the app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

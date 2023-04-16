import express from "express";
import pg from "pg";
import * as dotenv from "dotenv";
import cors from "cors";
import { router } from "./router.js";

dotenv.config();

const app = express();

export const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

app.use(cors(), express.json());
app.use('/',router)

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server is up on ", port);
});

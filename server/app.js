import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import serveStatic from "serve-static";
import { readFileSync } from "fs";
import { join } from "path";
import cookieParser from "cookie-parser";

const STATIC_PATH = `${process.cwd()}/../client/build`;

//importing .env variables

const app = express();

//applying middlewares for incoming request

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://pumper-panel-dc68ec84419a.herokuapp.com",
    ],
  })
);
app.use(serveStatic(STATIC_PATH, { index: false }));
app.use(cookieParser());

// Route Imports
import getDiscount from "./routes/discountRoute.js";
import shopRoutes from "./routes/shopRoute.js";
import user from "./routes/userRoute.js";

app.use("/api/discountDetails/", getDiscount);
app.use("/api/shopDetails/", shopRoutes);
app.use("/api/user/", user);

app.use("/*", async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

export default app;

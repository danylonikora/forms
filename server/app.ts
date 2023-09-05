import fs from "fs";
import https from "https";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import sessionMiddleware from "./middlewares/session";
import signupRouter from "./routes/signup";
import loginRouter from "./routes/login";
import logoutRouter from "./routes/logout";
import formRouter from "./routes/form";

const app = express();
const PORT = 3000;

const serverOptions = {
  key: fs.readFileSync("C:/Users/User/server.key"),
  cert: fs.readFileSync("C:/Users/User/server.crt"),
};
https.createServer(serverOptions, app).listen(PORT, () => {
  console.log(`Server is runnin on https://localhost:${PORT}`);
});

app.use(cors({ origin: "https://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionMiddleware);

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/forms", formRouter);

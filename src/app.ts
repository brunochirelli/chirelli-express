import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import config from "./config";
import fourOhFour from "./middlewares/fourOhFour";
import errorHandler from "./middlewares/errorHandler";
import root from "./routes/root.routes";
import { authenticateUser } from "./middlewares/auth";

const app = express();

// Apply most middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: config.clientOrigins[config.nodeEnv],
  }),
);

app.use(helmet());
app.use(morgan("tiny"));

// Local middlewares
app.use(authenticateUser);

// Apply routes before error handling
app.use("/", root);

// Apply error handling last
app.use(fourOhFour);
app.use(errorHandler);

export default app;

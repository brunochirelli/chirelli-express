import express from "express";
import {
  authRoot,
  errorRoot,
  getRoot,
  postRoot,
} from "../controllers/root.controller";
import { isAuthorized } from "../middlewares/auth";

const root = express.Router();

root.get("/", getRoot);
root.post("/", postRoot);
root.get("/error", errorRoot);
root.get("/auth", isAuthorized(["delete"]), authRoot);

export default root;

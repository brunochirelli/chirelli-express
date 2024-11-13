import express from "express";
import { errorRoot, getRoot, postRoot } from "../controllers/root.controller";

const root = express.Router();

root.get("/", getRoot);
root.post("/", postRoot);
root.get("/error", errorRoot);

export default root;

import express from "express";
import { signUp, login, logOut, checkAuth } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const route = express.Router();

route.post("/signUp", signUp);
route.post("/login", login);
route.get("/logOut", logOut)

route.get("/check", protectedRoute, checkAuth);

export default route;
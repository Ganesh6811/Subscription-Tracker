import express from "express";
import { addSubscription, updateSubscriptions, deleteSubscription, getSubscriptions } from "../controllers/subscriptions.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const route = express.Router();

route.post("/", protectedRoute, addSubscription);
route.patch("/:id", protectedRoute, updateSubscriptions);
route.get("/", protectedRoute, getSubscriptions);
route.delete("/:id", protectedRoute, deleteSubscription);

export default route;
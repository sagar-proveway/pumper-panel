import express from "express";
import { CannyToken } from "../controller/cannyToken.js";

const router = express.Router();
router.route("/cannySSO").get(CannyToken);

export default router;

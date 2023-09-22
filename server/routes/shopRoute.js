import express from "express";
import {
  getCurrency,
  getSettings,
  getShopById,
  getStore,
  setSettings,
} from "../controller/shopController.js";
import verifyJwt from "../utils/verifyToken.js";

const router = express.Router();

router.route("/getStore").get(verifyJwt, getStore);
router.route("/getShopById").post(verifyJwt, getShopById);
router.route("/getSettings").post(verifyJwt, getSettings);
router.route("/setSettings").post(verifyJwt, setSettings);
router.route("/getCurrency").post(verifyJwt, getCurrency);

export default router;

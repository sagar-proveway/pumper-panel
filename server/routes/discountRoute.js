import express from "express";

import {
  editDiscount,
  getAllDiscountById,
  getDiscountById,
  getDiscountByIdToCompare,
} from "../controller/discountController.js";
import verifyJwt from "../utils/verifyToken.js";

const router = express.Router();

router.route("/getDiscountById").post(verifyJwt, getDiscountById);
router.route("/getAllDiscountById").post(verifyJwt, getAllDiscountById);
router
  .route("/getDiscountByIdToCompare")
  .post(verifyJwt, getDiscountByIdToCompare);
router.route("/editDiscount").post(verifyJwt, editDiscount);

export default router;

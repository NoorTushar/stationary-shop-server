import express from "express";
import { OrderController } from "./orders.controller";

const router = express.Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getAllOrders);
router.get("/revenue", OrderController.getTotalOrderRevenue);
router.get("/:orderId", OrderController.getSingleOrder);
router.put("/:orderId", OrderController.updateSingleOrder);
router.delete("/:orderId", OrderController.deleteSingleOrder);

export const OrderRoutes = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
const router = express_1.default.Router();
router.post("/", orders_controller_1.OrderController.createOrder);
router.get("/", orders_controller_1.OrderController.getAllOrders);
router.get("/revenue", orders_controller_1.OrderController.getTotalOrderRevenue);
router.put("/:orderId", orders_controller_1.OrderController.updateSingleOrder);
router.get("/:orderId", orders_controller_1.OrderController.getSingleOrder);
router.delete("/:orderId", orders_controller_1.OrderController.deleteSingleOrder);
exports.OrderRoutes = router;

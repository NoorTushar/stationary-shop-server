"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const orders_service_1 = require("./orders.service");
const orders_validation_1 = __importDefault(require("./orders.validation"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // receive the order data from client's end
        const orderInfo = req.body;
        // sanitize the product data using Zod
        const zodParsedOrder = orders_validation_1.default.parse(orderInfo);
        const result = yield orders_service_1.OrderServices.createOrderIntoDB(zodParsedOrder);
        res.status(200).send({
            message: "Order was created successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        // Type assertion to assume 'error' is an instance of Error
        const err = error; // type assertion
        res.status(400).send({
            message: err.message || "Error while creating an order.",
            success: false,
            error: err,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orders_service_1.OrderServices.getAllOrdersFromDB();
        res.status(200).send({
            message: "Orders retrieved successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            message: "Error while retrieving all orders.",
            success: false,
            error,
        });
    }
});
const getSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // receive the orderId from the client's parameters
        const { orderId } = req.params;
        // using the orderId, get the order information from the database
        const result = yield orders_service_1.OrderServices.getSingleOrderFromDB(orderId);
        res.status(200).send({
            message: "Order retrieved successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            message: error.message || "Error while retrieving the product.",
            success: false,
            error: error,
        });
    }
});
const updateSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // receive the orderId from the client's parameters
        const { orderId } = req.params;
        // receive the data to be updated from the client's body
        const updateData = req.body;
        const result = yield orders_service_1.OrderServices.updateSingleOrderFromDB(orderId, updateData);
        res.status(200).send({
            message: "Order updated successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            message: error.message || "Error while updating the product.",
            success: false,
            error,
        });
    }
});
const deleteSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // receive the orderId from the client's parameters
        const { orderId } = req.params;
        // using the orderId, delete the order information from the database
        const result = yield orders_service_1.OrderServices.deleteSingleOrderFromDB(orderId);
        res.status(200).send({
            message: "Order deleted successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            message: error.message || "Error while deleting the order.",
            success: false,
            error,
        });
    }
});
const getTotalOrderRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orders_service_1.OrderServices.getTotalOrderRevenueFromDB();
        res.status(200).send({
            message: "Revenue calculated successfully",
            success: true,
            data: result[0],
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            message: "Error while calculating total revenue.",
            success: false,
            error,
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateSingleOrder,
    deleteSingleOrder,
    getTotalOrderRevenue,
};

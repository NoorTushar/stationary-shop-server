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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const products_model_1 = require("../stationaryProducts/products.model");
const orders_model_1 = require("./orders.model");
const createOrderIntoDB = (orderInfo) => __awaiter(void 0, void 0, void 0, function* () {
    // get the product, which the user is trying to order from Products Collection
    const product = yield products_model_1.ProductModel.findOne({
        _id: orderInfo.product,
        inStock: true,
    });
    // throw error message if the product does not exist or the stock is unavailable
    if (!product) {
        throw new Error("Product you are trying to order is currently unavailable.");
    }
    // throw error message if order quantity is unavailable in product stock quantity
    if (product.quantity < orderInfo.quantity) {
        throw new Error("Insufficient Stock");
    }
    // create an order into the database
    const result = yield orders_model_1.OrderModel.create(orderInfo);
    // phase: update the stock quantity after creating the order
    const quantityAfterOrder = product.quantity - orderInfo.quantity;
    // if quantity becomes zero after order, update the product stock quantity as well as -
    // make inStock to false
    if (quantityAfterOrder === 0) {
        yield products_model_1.ProductModel.findByIdAndUpdate(product._id, {
            quantity: quantityAfterOrder,
            inStock: false,
        });
    }
    else {
        // else only update the product stock quantity
        yield products_model_1.ProductModel.findByIdAndUpdate(product._id, {
            quantity: quantityAfterOrder,
        });
    }
    return result;
});
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.OrderModel.find();
    return result;
});
const getSingleOrderFromDB = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.OrderModel.findById(orderId);
    if (!result) {
        throw new Error("The order you are trying to find does not exist.");
    }
    return result;
});
const updateSingleOrderFromDB = (orderId, orderInfo) => __awaiter(void 0, void 0, void 0, function* () {
    // find if order exists or not using custom static method
    const isOrderExist = yield orders_model_1.OrderModel.isOrderExist(orderId);
    // if it does not exist, there is nothing to update
    if (!isOrderExist)
        throw new Error("The order you are trying to update, does not exist.");
    const result = orders_model_1.OrderModel.findByIdAndUpdate(orderId, orderInfo, {
        new: true,
    });
    return result;
});
const deleteSingleOrderFromDB = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    // find if order exists or not using custom static method
    const isOrderExist = yield orders_model_1.OrderModel.isOrderExist(orderId);
    // if it does not exist, there is nothing to delete
    if (!isOrderExist)
        throw new Error("The order you are trying to delete, does not exist.");
    // If the order exists, delete it.
    const result = yield orders_model_1.OrderModel.findByIdAndDelete(orderId);
    return result;
});
const getTotalOrderRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.OrderModel.aggregate([
        // 1st pipeline
        // Group all documents to calculate the revenue.
        {
            $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } },
        },
        // 2nd pipeline
        // Projecting only totalRevenue and removing _id
        {
            $project: { _id: 0, totalRevenue: 1 },
        },
    ]);
    return result;
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
    getSingleOrderFromDB,
    updateSingleOrderFromDB,
    deleteSingleOrderFromDB,
    getTotalOrderRevenueFromDB,
};

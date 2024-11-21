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
exports.ProductsController = void 0;
const products_service_1 = require("./products.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productInfo = req.body;
        const result = yield products_service_1.ProductServices.createProductIntoDB(productInfo);
        res.status(201).send({
            message: "Product created successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error while creating a product.",
            success: false,
            error,
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_service_1.ProductServices.getAllProductsFromDB();
        res.status(200).send({
            message: "Products retrieved successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error while retrieving all products.",
            success: false,
            error,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_service_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).send({
            message: "Product retrieved successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            message: "Error while retrieving the product.",
            success: false,
            error,
        });
    }
});
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_service_1.ProductServices.deleteAProductFromDB(productId);
        res.status(200).send({
            message: "Product deleted successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error while deleting the product.",
            success: false,
            error,
        });
    }
});
exports.ProductsController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteSingleProduct,
};

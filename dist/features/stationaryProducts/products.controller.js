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
exports.ProductsController = void 0;
const products_service_1 = require("./products.service");
const products_validation_1 = __importDefault(require("./products.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // receive the product data from client's end
        const productInfo = req.body;
        // sanitize the product data using Zod
        const zodParsedProduct = products_validation_1.default.parse(productInfo);
        // product will be created once the product is parsed using zod
        // else will thrown an Error
        const result = yield products_service_1.ProductServices.createProductIntoDB(zodParsedProduct);
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
            error: error,
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // taking query parameters from client
        const searchTerm = req.query.searchTerm;
        // getting all the products, passing query as argument
        const result = yield products_service_1.ProductServices.getAllProductsFromDB(searchTerm);
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
        // receive the productId from the client's parameters
        const { productId } = req.params;
        // using the productId, get the product information from the database
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
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // receive the productId from the client's parameters
        const { productId } = req.params;
        // receive the data to be updated from the client's body
        const updateData = req.body;
        const result = yield products_service_1.ProductServices.updateSingleProductFromDB(productId, updateData);
        res.status(200).send({
            message: "Product updated successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error while updating the product.",
            success: false,
            error,
        });
    }
});
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // receive the productId from the client's parameters
        const { productId } = req.params;
        // using the productId, delete the product information from the database
        const result = yield products_service_1.ProductServices.deleteAProductFromDB(productId);
        res.status(200).send({
            message: "Product deleted successfully",
            success: true,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            message: error.message || "Error while deleting the product.",
            success: false,
            error,
        });
    }
});
exports.ProductsController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};

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
exports.ProductServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const products_model_1 = require("./products.model");
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.ProductModel.create(productData);
    return result;
});
const getAllProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = {};
    if (searchTerm) {
        searchQuery.$or = [
            {
                name: { $regex: searchTerm, $options: "i" },
            },
            {
                category: { $regex: searchTerm, $options: "i" },
            },
            {
                brand: { $regex: searchTerm, $options: "i" },
            },
        ];
    }
    const result = yield products_model_1.ProductModel.find(searchQuery);
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.ProductModel.findById(id);
    return result;
});
const updateSingleProductFromDB = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExist = yield products_model_1.ProductModel.isProductExist(id);
    if (!isProductExist)
        throw new Error("The product you are trying to update does not exist.");
    const result = yield products_model_1.ProductModel.findByIdAndUpdate(id, productData, {
        new: true,
    });
    return result;
});
const deleteAProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // using custom static method, first we will check if the product exists or not
    // if it does not exist, then no point in deleting, we will throw and Error
    const isProductExist = yield products_model_1.ProductModel.isProductExist(id);
    if (!isProductExist)
        throw new Error("The product you are trying to delete does not exist.");
    // if the product exists we will delete it
    const result = yield products_model_1.ProductModel.findByIdAndDelete(id);
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateSingleProductFromDB,
    deleteAProductFromDB,
};

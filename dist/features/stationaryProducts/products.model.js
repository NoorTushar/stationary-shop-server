"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Product name is required."],
        trim: true,
    },
    brand: {
        type: String,
        required: [true, "Brand name is required."],
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: [
            "Writing",
            "Office Supplies",
            "Art Supplies",
            "Educational",
            "Technology",
        ],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true,
    },
});
exports.ProductModel = (0, mongoose_1.model)("stationaryProduct", productSchema);

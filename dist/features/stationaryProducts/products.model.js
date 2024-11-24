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
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Product name is required."],
        trim: true,
        validate: {
            validator: function (value) {
                const nameWithCapital = value.charAt(0).toUpperCase() + value.slice(1);
                return value === nameWithCapital;
            },
            message: "Product name must start with capital letter",
        },
    },
    brand: {
        type: String,
        required: [true, "Brand name is required."],
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be a positive value"],
    },
    category: {
        type: String,
        enum: {
            values: [
                "Writing",
                "Office Supplies",
                "Art Supplies",
                "Educational",
                "Technology",
            ],
            message: "{VALUE} is not a valid category.",
        },
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });
productSchema.statics.isProductExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield exports.ProductModel.findById(id);
        return existingProduct;
    });
};
exports.ProductModel = (0, mongoose_1.model)("product", productSchema);

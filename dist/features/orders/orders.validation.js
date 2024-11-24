"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderZodSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email({ message: "Please enter a valid email address" })
        .min(5, {
        message: "Email length must be a minimum of 5 characters",
    }),
    product: zod_1.z.string(),
    quantity: zod_1.z.number().positive({
        message: "Quantity must be a positive value",
    }),
    totalPrice: zod_1.z.number().positive({
        message: "Total price must be a positive value",
    }),
});
exports.default = orderZodSchema;

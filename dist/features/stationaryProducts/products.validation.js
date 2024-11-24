"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productZodSchema = zod_1.z.object({
    name: zod_1.z.string(),
    brand: zod_1.z.string(),
    price: zod_1.z.number(),
    category: zod_1.z.enum([
        "Writing",
        "Office Supplies",
        "Art Supplies",
        "Educational",
        "Technology",
    ]),
    description: zod_1.z.string(),
    quantity: zod_1.z.number(),
    inStock: zod_1.z.boolean(),
});
exports.default = productZodSchema;

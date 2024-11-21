import { model, Schema } from "mongoose";
import { IProducts } from "./products.interface";

const productSchema = new Schema<IProducts>({
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

export const ProductModel = model<IProducts>(
   "stationaryProduct",
   productSchema
);

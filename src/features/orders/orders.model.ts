import { model, Schema } from "mongoose";
import { IOrder } from "./orders.interface";

const orderSchema = new Schema<IOrder>(
   {
      email: {
         type: String,
         required: true,
      },
      product: {
         type: String,
         required: true,
      },
      quantity: {
         type: Number,
         required: true,
         min: [0, "Quantity must be a positive value"],
      },
      totalPrice: {
         type: Number,
         required: true,
         min: [0, "Total order must be a positive value"],
      },
   },
   { timestamps: true }
);

export const OrderModel = model("order", orderSchema);

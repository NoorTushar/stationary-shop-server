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
      },
      totalPrice: {
         type: Number,
         required: true,
      },
   },
   { timestamps: true }
);

export const OrderModel = model("order", orderSchema);
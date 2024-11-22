import { model, Schema } from "mongoose";
import { IOrder, IOrderModel } from "./orders.interface";

const orderSchema = new Schema<IOrder, IOrderModel>(
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

orderSchema.statics.isOrderExist = async function (id: string) {
   const result = await OrderModel.findById(id);
   return result;
};

export const OrderModel = model<IOrder, IOrderModel>("order", orderSchema);

import { IOrder } from "./orders.interface";
import { OrderModel } from "./orders.model";

const createOrderIntoDB = async (orderInfo: IOrder) => {
   const result = await OrderModel.create(orderInfo);
   return result;
};

const getAllOrdersFromDB = async () => {
   const result = await OrderModel.find();
   return result;
};

const getSingleOrderFromDB = async (orderId: string) => {
   const result = await OrderModel.findById(orderId);
   return result;
};

const updateSingleOrderFromDB = async (orderId: string, orderInfo: IOrder) => {
   const result = OrderModel.findByIdAndUpdate(orderId, orderInfo, {
      new: true,
   });
   return result;
};

const deleteSingleOrderFromDB = async (orderId: string) => {
   const result = await OrderModel.findByIdAndDelete(orderId);
   return result;
};

export const OrderServices = {
   createOrderIntoDB,
   getAllOrdersFromDB,
   getSingleOrderFromDB,
   updateSingleOrderFromDB,
   deleteSingleOrderFromDB,
};

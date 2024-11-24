import { ProductModel } from "../stationaryProducts/products.model";
import { IOrder } from "./orders.interface";
import { OrderModel } from "./orders.model";

const createOrderIntoDB = async (orderInfo: IOrder) => {
   // get the product, which the user is trying to order from Products Collection
   const product = await ProductModel.findOne({
      _id: orderInfo.product,
      inStock: true,
   });

   // throw error message if the product does not exist or the stock is unavailable
   if (!product) {
      throw new Error(
         "Product you are trying to order is currently unavailable."
      );
   }

   // throw error message if order quantity is unavailable in product stock quantity
   if (product.quantity < orderInfo.quantity) {
      throw new Error("Insufficient Stock");
   }

   // create an order into the database
   const result = await OrderModel.create(orderInfo);

   // phase: update the stock quantity after creating the order
   const quantityAfterOrder = product.quantity - orderInfo.quantity;

   // if quantity becomes zero after order, update the product stock quantity as well as -
   // make inStock to false
   if (quantityAfterOrder === 0) {
      await ProductModel.findByIdAndUpdate(product._id, {
         quantity: quantityAfterOrder,
         inStock: false,
      });
   } else {
      // else only update the product stock quantity
      await ProductModel.findByIdAndUpdate(product._id, {
         quantity: quantityAfterOrder,
      });
   }

   return result;
};

const getAllOrdersFromDB = async () => {
   const result = await OrderModel.find();
   return result;
};

const getSingleOrderFromDB = async (orderId: string) => {
   const result = await OrderModel.findById(orderId);

   if (!result) {
      throw new Error("The order you are trying to find does not exist.");
   }

   return result;
};

const updateSingleOrderFromDB = async (orderId: string, orderInfo: IOrder) => {
   // find if order exists or not using custom static method
   const isOrderExist = await OrderModel.isOrderExist(orderId);

   // if it does not exist, there is nothing to update
   if (!isOrderExist)
      throw new Error("The order you are trying to update, does not exist.");

   const result = OrderModel.findByIdAndUpdate(orderId, orderInfo, {
      new: true,
   });
   return result;
};

const deleteSingleOrderFromDB = async (orderId: string) => {
   // find if order exists or not using custom static method
   const isOrderExist = await OrderModel.isOrderExist(orderId);

   // if it does not exist, there is nothing to delete
   if (!isOrderExist)
      throw new Error("The order you are trying to delete, does not exist.");

   // If the order exists, delete it.
   const result = await OrderModel.findByIdAndDelete(orderId);
   return result;
};

const getTotalOrderRevenueFromDB = async () => {
   const result = await OrderModel.aggregate([
      // 1st pipeline
      // Group all documents to calculate the revenue.
      {
         $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } },
      },
      // 2nd pipeline
      // Projecting only totalRevenue and removing _id
      {
         $project: { _id: 0, totalRevenue: 1 },
      },
   ]);
   return result;
};

export const OrderServices = {
   createOrderIntoDB,
   getAllOrdersFromDB,
   getSingleOrderFromDB,
   updateSingleOrderFromDB,
   deleteSingleOrderFromDB,
   getTotalOrderRevenueFromDB,
};

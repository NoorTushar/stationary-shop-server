import { Request, Response } from "express";
import { OrderServices } from "./orders.service";

const createOrder = async (req: Request, res: Response) => {
   try {
      // receive the order data from client's end
      const orderInfo = req.body;
      const result = await OrderServices.createOrderIntoDB(orderInfo);

      res.status(200).send({
         message: "Order was created successfully",
         success: true,
         data: result,
      });
   } catch (error) {
      console.log(error);
      res.status(400).send({
         message: "Error while creating an order.",
         success: false,
         error,
      });
   }
};

const getAllOrders = async (req: Request, res: Response) => {
   try {
      const result = await OrderServices.getAllOrdersFromDB();

      res.status(200).send({
         message: "Orders retrieved successfully",
         success: true,
         data: result,
      });
   } catch (error) {
      console.log(error);
      res.status(400).send({
         message: "Error while retrieving all orders.",
         success: false,
         error,
      });
   }
};

const getSingleOrder = async (req: Request, res: Response) => {
   try {
      // receive the orderId from the client's parameters
      const { orderId } = req.params;

      // using the orderId, get the order information from the database
      const result = await OrderServices.getSingleOrderFromDB(orderId);

      res.status(200).send({
         message: "Order retrieved successfully",
         success: true,
         data: result,
      });
   } catch (error) {
      console.log(error);
      res.status(404).send({
         message: "Error while retrieving the order.",
         success: false,
         error,
      });
   }
};

const updateSingleOrder = async (req: Request, res: Response) => {
   try {
      // receive the orderId from the client's parameters
      const { orderId } = req.params;
      // receive the data to be updated from the client's body
      const updateData = req.body;

      const result = await OrderServices.updateSingleOrderFromDB(
         orderId,
         updateData
      );
      res.status(200).send({
         message: "Order updated successfully",
         success: true,
         data: result,
      });
   } catch (error) {
      console.log(error);
      res.status(400).send({
         message: "Error while updating the order.",
         success: false,
         error,
      });
   }
};

const deleteSingleOrder = async (req: Request, res: Response) => {
   try {
      // receive the orderId from the client's parameters
      const { orderId } = req.params;

      // using the orderId, delete the order information from the database
      const result = await OrderServices.deleteSingleOrderFromDB(orderId);

      res.status(200).send({
         message: "Order deleted successfully",
         success: true,
         data: result,
      });
   } catch (error) {
      console.log(error);
      res.status(404).send({
         message: "Error while deleting the order.",
         success: false,
         error,
      });
   }
};

export const OrderController = {
   createOrder,
   getAllOrders,
   getSingleOrder,
   updateSingleOrder,
   deleteSingleOrder,
};

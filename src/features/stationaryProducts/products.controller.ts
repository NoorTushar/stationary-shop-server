import { Request, Response } from "express";
import { ProductServices } from "./products.service";
import { IProducts } from "./products.interface";
import productZodSchema from "./products.validation";

const createProduct = async (req: Request, res: Response) => {
   try {
      // receive the product data from client's end
      const productInfo: IProducts = req.body;

      // sanitize the product data using Zod
      const zodParsedProduct = productZodSchema.parse(productInfo);

      // product will be created once the product is parsed using zod
      // else will thrown an Error
      const result = await ProductServices.createProductIntoDB(
         zodParsedProduct
      );

      res.status(201).send({
         message: "Product created successfully",
         success: true,
         data: result,
      });
   } catch (error) {
      console.log(error);
      res.status(400).send({
         message: "Error while creating a product.",
         success: false,
         error,
      });
   }
};

const getAllProducts = async (req: Request, res: Response) => {
   try {
      const result = await ProductServices.getAllProductsFromDB();

      res.status(200).send({
         message: "Products retrieved successfully",
         success: true,
         data: result,
      });
   } catch (error) {
      console.log(error);
      res.status(400).send({
         message: "Error while retrieving all products.",
         success: false,
         error,
      });
   }
};

const getSingleProduct = async (req: Request, res: Response) => {
   try {
      // receive the productId from the client's parameters
      const { productId } = req.params;

      // using the productId, get the product information from the database
      const result = await ProductServices.getSingleProductFromDB(productId);

      res.status(200).send({
         message: "Product retrieved successfully",
         success: true,
         data: result,
      });
   } catch (error) {
      console.log(error);
      res.status(404).send({
         message: "Error while retrieving the product.",
         success: false,
         error,
      });
   }
};

const updateSingleProduct = async (req: Request, res: Response) => {
   try {
      // receive the productId from the client's parameters
      const { productId } = req.params;
      // receive the data to be updated from the client's body
      const updateData = req.body;

      const result = await ProductServices.updateSingleProductFromDB(
         productId,
         updateData
      );
      res.status(200).send({
         message: "Product updated successfully",
         success: true,
         data: result,
      });
   } catch (error) {
      console.log(error);
      res.status(400).send({
         message: "Error while updating the product.",
         success: false,
         error,
      });
   }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
   try {
      // receive the productId from the client's parameters
      const { productId } = req.params;

      // using the productId, delete the product information from the database
      const result = await ProductServices.deleteAProductFromDB(productId);

      res.status(200).send({
         message: "Product deleted successfully",
         success: true,
         data: result,
      });
   } catch (error) {
      console.log(error);
      res.status(400).send({
         message: "Error while deleting the product.",
         success: false,
         error,
      });
   }
};

export const ProductsController = {
   createProduct,
   getAllProducts,
   getSingleProduct,
   updateSingleProduct,
   deleteSingleProduct,
};

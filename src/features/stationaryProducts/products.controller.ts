import { Request, Response } from "express";
import { ProductServices } from "./products.service";
import { IProducts } from "./products.interface";

const createProduct = async (req: Request, res: Response) => {
   try {
      const productInfo: IProducts = req.body;

      const result = await ProductServices.createProductIntoDB(productInfo);

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
      const { productId } = req.params;

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

const deleteSingleProduct = async (req: Request, res: Response) => {
   try {
      const { productId } = req.params;

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
   deleteSingleProduct,
};

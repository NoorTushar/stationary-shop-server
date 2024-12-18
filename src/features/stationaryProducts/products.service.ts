/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductModel } from "./products.model";
import { IProducts } from "./products.interface";

const createProductIntoDB = async (productData: IProducts) => {
   const result = await ProductModel.create(productData);
   return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
   const searchQuery: Record<string, any> = {};
   if (searchTerm) {
      searchQuery.$or = [
         {
            name: { $regex: searchTerm, $options: "i" },
         },
         {
            category: { $regex: searchTerm, $options: "i" },
         },
         {
            brand: { $regex: searchTerm, $options: "i" },
         },
      ];
   }

   const result = await ProductModel.find(searchQuery);
   return result;
};

const getSingleProductFromDB = async (id: string) => {
   const result = await ProductModel.findById(id);
   if (!result) {
      throw new Error("The product you are trying to find does not exist.");
   }
   return result;
};

const updateSingleProductFromDB = async (
   id: string,
   productData: IProducts
) => {
   const isProductExist = await ProductModel.isProductExist(id);

   if (!isProductExist)
      throw new Error("The product you are trying to update does not exist.");

   const result = await ProductModel.findByIdAndUpdate(id, productData, {
      new: true,
   });
   return result;
};

const deleteAProductFromDB = async (id: string) => {
   // using custom static method, first we will check if the product exists or not
   // if it does not exist, then no point in deleting, we will throw and Error
   const isProductExist = await ProductModel.isProductExist(id);

   if (!isProductExist)
      throw new Error("The product you are trying to delete does not exist.");

   // if the product exists we will delete it
   const result = await ProductModel.findByIdAndDelete(id);
   return result;
};

export const ProductServices = {
   createProductIntoDB,
   getAllProductsFromDB,
   getSingleProductFromDB,
   updateSingleProductFromDB,
   deleteAProductFromDB,
};

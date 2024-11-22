import { ProductModel } from "./products.model";
import { IProducts } from "./products.interface";

const createProductIntoDB = async (productData: IProducts) => {
   const result = await ProductModel.create(productData);
   return result;
};

const getAllProductsFromDB = async () => {
   const result = await ProductModel.find();
   return result;
};

const getSingleProductFromDB = async (id: string) => {
   const result = await ProductModel.findById(id);
   return result;
};

const updateSingleProductFromDB = async (
   id: string,
   productData: IProducts
) => {
   const result = await ProductModel.findByIdAndUpdate(id, productData);
   return result;
};

const deleteAProductFromDB = async (id: string) => {
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

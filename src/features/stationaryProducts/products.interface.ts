import { Model } from "mongoose";

export type TCategory =
   | "Writing"
   | "Office Supplies"
   | "Art Supplies"
   | "Educational"
   | "Technology";

export interface IProducts {
   name: string;
   brand: string;
   price: number;
   category: TCategory;
   description: string;
   quantity: number;
   inStock: boolean;
}

export interface IProductsStaticModel extends Model<IProducts> {
   // eslint-disable-next-line no-unused-vars
   isProductExist(id: string): Promise<IProducts | null>;
}

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

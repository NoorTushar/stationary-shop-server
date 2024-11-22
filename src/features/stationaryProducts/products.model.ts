import { model, Schema } from "mongoose";
import { IProducts, IProductsStaticModel } from "./products.interface";

const productSchema = new Schema<IProducts, IProductsStaticModel>(
   {
      name: {
         type: String,
         required: [true, "Product name is required."],
         trim: true,
         validate: {
            validator: function (value: string) {
               const nameWithCapital =
                  value.charAt(0).toUpperCase() + value.slice(1);
               return value === nameWithCapital;
            },
            message: "Product name must start with capital letter",
         },
      },
      brand: {
         type: String,
         required: [true, "Brand name is required."],
         trim: true,
      },
      price: {
         type: Number,
         required: true,
         min: [0, "Price must be a positive value"],
      },
      category: {
         type: String,
         enum: {
            values: [
               "Writing",
               "Office Supplies",
               "Art Supplies",
               "Educational",
               "Technology",
            ],
            message: "{VALUE} is not a valid category.",
         },
         required: true,
         trim: true,
      },
      description: {
         type: String,
         required: true,
         trim: true,
      },
      quantity: {
         type: Number,
         required: true,
      },
      inStock: {
         type: Boolean,
         required: true,
      },
   },
   { timestamps: true }
);

productSchema.statics.isProductExist = async function (id: string) {
   const existingProduct = await ProductModel.findById(id);
   return existingProduct;
};

export const ProductModel = model<IProducts, IProductsStaticModel>(
   "product",
   productSchema
);

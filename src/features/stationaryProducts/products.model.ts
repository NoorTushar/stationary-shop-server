import { model, Schema } from "mongoose";
import { IProducts } from "./products.interface";

const productSchema = new Schema<IProducts>(
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
         default: true,
      },
   },
   { timestamps: true }
);

export const ProductModel = model<IProducts>(
   "stationaryProduct",
   productSchema
);

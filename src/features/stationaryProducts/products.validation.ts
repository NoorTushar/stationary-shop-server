import { z } from "zod";

const productZodSchema = z.object({
   name: z.string(),
   brand: z.string(),
   price: z.number(),
   category: z.enum([
      "Writing",
      "Office Supplies",
      "Art Supplies",
      "Educational",
      "Technology",
   ]),
   description: z.string(),
   quantity: z.number(),
   inStock: z.boolean(),
});

export default productZodSchema;

import { z } from "zod";

const orderZodSchema = z.object({
   email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .min(5, {
         message: "Email length must be a minimum of 5 characters",
      }),

   product: z.string(),
   quantity: z.number().positive({
      message: "Quantity must be a positive value",
   }),
   totalPrice: z.number().positive({
      message: "Total price must be a positive value",
   }),
});

export default orderZodSchema;

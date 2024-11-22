import express from "express";
import { ProductsController } from "./products.controller";

const router = express.Router();

router.post("/", ProductsController.createProduct);
router.get("/", ProductsController.getAllProducts);
router.get("/:productId", ProductsController.getSingleProduct);
router.put("/:productId", ProductsController.updateSingleProduct);
router.delete("/:productId", ProductsController.deleteSingleProduct);

export const ProductsRoutes = router;

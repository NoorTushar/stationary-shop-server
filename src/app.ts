import express, { Response, Request, Application } from "express";
import cors from "cors";
import { ProductsRoutes } from "./features/stationaryProducts/products.route";
import { OrderRoutes } from "./features/orders/orders.route";

const app: Application = express();

// parsers
app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(cors());

app.use("/api/products", ProductsRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
   res.send("Hello from the server");
});

export default app;

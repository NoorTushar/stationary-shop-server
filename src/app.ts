import express, { Response, Request, Application } from "express";
import cors from "cors";
import { ProductsRoutes } from "./features/stationaryProducts/products.route";

const app: Application = express();

// parsers
app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(cors());

app.use("/api/products", ProductsRoutes);

app.get("/", (req: Request, res: Response) => {
   res.send("Hello from the server");
});

export default app;

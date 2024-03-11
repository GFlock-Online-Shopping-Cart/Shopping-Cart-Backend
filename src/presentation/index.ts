import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import express from "express";
import { myDataSource } from "../config/dataSource";

import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";
import cartItemRouter from "./routes/cartRoutes";
import categoryRouter from "./routes/categoryRoutes";

const cors = require("cors");
const app = express();

app.use(cors());
// JSON body-parser middleware
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter); 
app.use("/api/product", productRouter);
app.use("/api/cart", cartItemRouter);
app.use("/api/category", categoryRouter);

myDataSource
  .initialize()
  .then(() => {
    console.log("Database is connected");
    app.listen(3001, () => {
      console.log("Server listening on port 3001");
    });
  })
  .catch((error: any) => console.log(error));

const options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Shopping Cart API",
      version: "1.0.0",
      description: "Shopping Cart Backend",
    },
  },
  apis: ["./src/utils/*.yaml"], 
  
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

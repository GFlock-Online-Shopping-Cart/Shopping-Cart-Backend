import "reflect-metadata";

import dotenv from "dotenv";
dotenv.config();

import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import express, { Request, Response, NextFunction } from "express";
import { myDataSource } from "../config/dataSource";

import userRouter from "./routes/userRoutes"
import productRouter from "./routes/productRoutes";
import cartItemRouter from "./routes/cartRoutes";
import categoryRouter from "./routes/categoryRoutes";
import checkoutRouter from "./routes/checkoutRoutes"

import { errorMiddleware } from "./middleware/error.middleware";
import { decodeAccessToken, validateAccessToken } from "./middleware/auth.middleware";



const cors = require("cors");
const app = express();


app.use(cors());
// JSON body-parser middleware
app.use(express.json());

app.use("/api/user", userRouter); 
app.use("/api/product", productRouter);
app.use("/api/cart", validateAccessToken, decodeAccessToken, cartItemRouter);
app.use("/api/category", categoryRouter);
app.use("/api/checkout", checkoutRouter);

app.use(errorMiddleware);

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
      security: [{
        bearerAuth: []
      }]
    },
  },
  apis: ["./src/utils/*.yaml"], 
  
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

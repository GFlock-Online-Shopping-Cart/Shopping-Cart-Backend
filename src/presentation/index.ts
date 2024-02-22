import "reflect-metadata"
import express from 'express';
import { myDataSource } from "../config/dataSource"

import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";
import cartItemRouter from "./routes/cartRoutes"

const app = express();

// JSON body-parser middleware
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartItemRouter);

myDataSource.initialize()
    .then(() => {
    console.log("Database is connected");
    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
    
    })
    .catch((error) => console.log(error)
    )



// (async () => {
//     try {
//         await AppDataSource.initialize();
//         console.log("Connected to the database successfully");
        
//         await AppDataSource.destroy();
//     } catch (error) {
//         console.log("Error connecting to the database", error);
        
//     }
// })
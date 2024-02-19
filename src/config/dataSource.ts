import "reflect-metadata";
import { DataSource } from "typeorm";


export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "shopping_cart",
    entities: ["src/domain/entities/*.ts"],
    logging: true,
    synchronize: true,  //entity will be synced with the db, everytime when run the application
})


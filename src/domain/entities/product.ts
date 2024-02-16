import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"; 

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    productId: number;

    @Column()
    productName: string;

    @Column()
    productImage: string;

    @Column()
    description: string;

    @Column("decimal")
    price: number;

    @Column()
    stock: number;
}
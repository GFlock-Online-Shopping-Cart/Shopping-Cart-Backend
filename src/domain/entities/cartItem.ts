import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";  

@Entity()
export class CartItem {

    @PrimaryColumn({type: "varchar"})
    userId: string;

    @PrimaryColumn()
    productId: number;

    @Column()
    quantity: number;
}
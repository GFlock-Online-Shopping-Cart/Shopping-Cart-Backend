import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, ManyToOne } from "typeorm"; 
import { CartItem } from "./cartItem";
import { User } from "./user";

@Entity()
export class Checkout {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    checkoutDate: Date;

    @Column("decimal")
    checkoutPrice: number;

    @Column()
    cardNumber: number;

    @ManyToMany(() => CartItem)
    @JoinTable()
    cartItems: CartItem[]

    @ManyToOne(() => User, (user) => user.checkouts, {
        cascade: true,
    })
    users: User

    
}


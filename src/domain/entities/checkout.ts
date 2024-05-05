import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm"; 
import { CheckoutItem } from "./checkoutItem";
import { User } from "./user";

@Entity()
export class Checkout {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    checkoutDate: Date;

    @Column({type: 'decimal'})
    checkoutPrice: number;

    @ManyToOne(() => User, user => user.checkouts)
    @JoinColumn({name: "userId"})
    user: User;

    @Column()
    userId: string;

    @OneToMany(() => CheckoutItem, checkoutItem => checkoutItem.checkout, {cascade: true})
    checkoutItems: CheckoutItem[];
    
}



import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"; 
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

    @ManyToOne(() => User, (user) => user.checkouts, {
        cascade: true,
    })
    users: User

    
}


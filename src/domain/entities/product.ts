import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    ManyToMany,
    OneToMany,
    JoinTable 
} from "typeorm"; 
import { Category } from "./category"; 
import { CheckoutItem } from "./checkoutItem";
import { CartItem } from "./cartItem";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column()
    productImage: string;

    @Column()
    description: string;

    @Column("decimal")
    price: number;

    @ManyToOne((type) => Category, (category) => category.products, {
        cascade: true,
    })

    @JoinTable()
    categories: Category

    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
    cartItems: CartItem[]

    @OneToMany(() => CheckoutItem, checkoutItem => checkoutItem.product)
    public checkoutItems: CheckoutItem[];
}
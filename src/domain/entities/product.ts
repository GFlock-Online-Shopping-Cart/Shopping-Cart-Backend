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
import { Checkout } from "./checkout";

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

    
    @OneToMany(() => Product, product => product.products)
    products: Product[]

    @ManyToMany(() => Checkout)
    @JoinTable()
    checkouts: Checkout[]
}
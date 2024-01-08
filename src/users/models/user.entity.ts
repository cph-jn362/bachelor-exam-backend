import { OrderEntity } from "src/orders/models/order.entity";
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from "typeorm";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column({ unique: true})
    email: string;
    
    @Column()
    password: string;

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[];
    
    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase(); 
    }
}
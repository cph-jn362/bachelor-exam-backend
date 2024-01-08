import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { UserEntity } from "src/users/models/user.entity";
import { BookEntity } from "src/books/models/book.entity";


@Entity('order')
export class OrderEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;
    
    @Column({type: 'date'})
    date: string;

    @ManyToOne(() => UserEntity, (user) => user.orders)
    user: UserEntity;

    @ManyToMany(() => OrderEntity, {
        cascade: true,
    })
    @JoinTable()
    books: BookEntity[];
}
import { PrimaryGeneratedColumn, Column, Entity, } from "typeorm";

@Entity('book')
export class BookEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;
    
    @Column()
    title: string;
    
    @Column()
    description: string;
    
    @Column()
    price: string;
    
    @Column()
    bookType: string;
    
    @Column({nullable: true})
    edition: string;

    @Column({nullable: true})
    discount: string;

}


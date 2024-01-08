import { BookEntity } from "src/books/models/book.entity";
import { UserEntity } from "src/users/models/user.entity";

export class CreateOrderDto {
    user: UserEntity;
    books: BookEntity[];
    constructor(
        public quantity: number,
        public date: string,
    ){}
}
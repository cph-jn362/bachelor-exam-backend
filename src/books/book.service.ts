import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './models/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async create(file: Express.Multer.File, createBookDto: CreateBookDto) {
    const {title, description, price, bookType, edition, discount} = createBookDto;
    const book = this.bookRepository.create({
      title: title,
      description: description,
      price: price,
      bookType: bookType,
      edition: edition,
      discount: discount,
      filename: file?.filename,
    })
    return await this.bookRepository.save(book);
  }

  async findAll(): Promise<BookEntity[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<BookEntity>{
    return this.bookRepository.findOneBy({id : id})
  } 

}



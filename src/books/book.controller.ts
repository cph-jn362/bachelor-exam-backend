import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Param,
} from '@nestjs/common';
import { BookService } from './book.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { BookEntity } from './models/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          return callback(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  async uploadBook(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBookDto: CreateBookDto
  ){
    return this.bookService.create(file, createBookDto);
  }

  @Get()
  async findAllBooks(): Promise<BookEntity[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOneBook(@Param('id') id): Promise<BookEntity>{
    return this.bookService.findOne(id);
  }

  
}

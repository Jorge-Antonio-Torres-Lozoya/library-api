import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';


@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.bookService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') bookId: string): Promise<Book> {
    const book = await this.bookService.getById(parseInt(bookId));
    return book;
  }

  @Post()
  async createBook(@Body() body: CreateBookDto): Promise<Book> {
    const book = await this.bookService.create(body);
    return book;
  }

  @Put('/:id')
  async update(
    @Param('id') bookId: string,
    @Body() body: CreateBookDto,
  ): Promise<Book> {
    const bookUpdated = await this.bookService.update(parseInt(bookId), body);
    return bookUpdated;
  }

  @Delete('/:id')
  async delete(@Param('id') bookId: string): Promise<Book> {
    const book = await this.bookService.delete(parseInt(bookId));
    return book;
  }
}

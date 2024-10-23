import { forwardRef, Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from '../author/author.module';
import { Book } from './book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), forwardRef(() => AuthorModule)],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}

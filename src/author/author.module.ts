import { forwardRef, Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { BookModule } from '../book/book.module';
import { Author } from './author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), forwardRef(() => BookModule)],
  providers: [AuthorService],
  controllers: [AuthorController],
  exports: [AuthorService],
})
export class AuthorModule {}

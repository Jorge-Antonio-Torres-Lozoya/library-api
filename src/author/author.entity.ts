import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../book/book.entity';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  authorId: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  bio: string;

  @OneToMany(() => Book, (book) => book.author, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  books: Book[];

}

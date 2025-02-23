import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DBOptions } from '../db.datasourceoptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const dbOptions: TypeOrmModuleOptions = {};
        Object.assign(dbOptions, DBOptions);
        return dbOptions;
      },
    }),
    AuthorModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}

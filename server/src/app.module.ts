import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist', 'client'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url: process.env.DATABASE_URL || 'postgres://bezOcheredi:bezOcheredi@localhost:54320/bezOcheredi',
      synchronize: process.env.NODE_ENV == 'development',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 54320,
      username: process.env.DB_USER || 'bezOcheredi',
      password: process.env.DB_PASSWORD || 'bezOcheredi',
      database: process.env.DB_NAME || 'bezOcheredi',
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migration/*.{.ts,.js}'],
      autoLoadEntities: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

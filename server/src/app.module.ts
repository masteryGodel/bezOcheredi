import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DateScalar } from './shared/date.scalar';
import { ApiModule } from './api.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
    }),
    ApiModule,
  ],
  controllers: [],
  providers: [DateScalar],
})
export class AppModule {}

import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { HttpErrorFilter } from './shared/http-error.filter';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
  exports: [UserModule],
})
export class ApiModule {}

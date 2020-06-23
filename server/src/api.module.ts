import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { HttpErrorFilter } from './shared/http-error.filter';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [UserModule, CompanyModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
  exports: [UserModule, CompanyModule],
})
export class ApiModule {}

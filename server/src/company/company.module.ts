import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyEntity } from './company.entity';
import { CompanyResolver } from './company.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyResolver],
})
export class CompanyModule {}

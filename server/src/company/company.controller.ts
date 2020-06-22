import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { CompanyService } from './company.service';
import { CompanyDTO } from './company.dto';
import { AuthGuard } from 'src/shared/auth.gaurd';

@Controller()
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('api/companies')
  @UseGuards(new AuthGuard())
  getAllCompanies(@Query('page') page: number) {
    return this.companyService.getAll(page);
  }

  @Get('api/companies/:id')
  @UseGuards(new AuthGuard())
  getOneCompany(@Param('id') id: string) {
    return this.companyService.getOne(id);
  }

  @Post('api/companies')
  @UseGuards(new AuthGuard())
  createCompany(@Body() data: CompanyDTO) {
    return this.companyService.create(data);
  }

  @Put('api/companies/:id')
  @UseGuards(new AuthGuard())
  updateCompany(@Param('id') id: string, @Body() data: CompanyDTO) {
    return this.companyService.update({ id, ...data });
  }

  @Delete('api/companies/:id')
  @UseGuards(new AuthGuard())
  deleteCompany(@Param('id') id: string) {
    return this.companyService.delete(id);
  }
}

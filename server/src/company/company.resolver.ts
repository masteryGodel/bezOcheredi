import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { CompanyDTO } from './company.dto';
import { CompanyService } from './company.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.gaurd';

@Resolver()
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}

  @Query()
  @UseGuards(new AuthGuard())
  async companies(@Args('page') page: number) {
    return await this.companyService.getAll(page);
  }

  @Query()
  @UseGuards(new AuthGuard())
  async company(@Args('id') id: string) {
    return await this.companyService.getOne(id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async createCompany(@Args('name') name: string) {
    const company: CompanyDTO = { name };
    return await this.companyService.create(company);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async updateCompany(@Args('id') id: string, @Args('name') name: string) {
    const company: CompanyDTO = { name, id };
    return await this.companyService.update(company);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async deleteCompany(@Args('id') id: string) {
    return await this.companyService.delete(id);
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyDTO } from './company.dto';
import { CompanyEntity } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  async getAll(page: number = 1) {
    const companies = await this.companyRepository.find({
      take: 25,
      skip: 25 * (page - 1),
    });
    return companies.map(company => company.toResponseObject());
  }

  async getOne(id: string) {
    const company = await this.companyRepository.findOne({
      where: { id },
    });
    return company.toResponseObject();
  }

  async create(data: CompanyDTO) {
    const { name } = data;

    let company = await this.companyRepository.findOne({ where: { name } });
    if (company) {
      throw new HttpException('Company already exists', HttpStatus.BAD_REQUEST);
    }
    company = await this.companyRepository.create(data);
    await this.companyRepository.save(company);
    return company.toResponseObject();
  }

  async update(data: CompanyDTO) {
    const { name, id } = data;

    let company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new HttpException('Company not exists', HttpStatus.BAD_REQUEST);
    }
    await this.companyRepository.update(
      { id },
      {
        name,
      },
    );
    company = await this.companyRepository.findOne({ where: { id } });

    return company.toResponseObject();
  }

  async delete(id) {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new HttpException('Company not exists', HttpStatus.BAD_REQUEST);
    }
    await this.companyRepository.delete({ id });

    return company.toResponseObject();
  }
}

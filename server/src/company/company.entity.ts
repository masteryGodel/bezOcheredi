import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { CompanyRO } from './company.dto';

@Entity('company')
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  name: string;

  toResponseObject(): CompanyRO {
    const { id, created, name } = this;
    const responseObject: CompanyRO = {
      id,
      created,
      name,
    };

    return responseObject;
  }
}

import { ROLES } from '../enums/roles';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserRO } from './user.dto';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.CLIENT })
  role: ROLES;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    console.log('HHH', this.token)
    const { id, created, username, token, role } = this;
    const responseObject: UserRO = {
      id,
      created,
      username,
      role
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token(): string {
    const { id, username, role } = this;

    return jwt.sign(
      {
        id,
        username,
        role,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}

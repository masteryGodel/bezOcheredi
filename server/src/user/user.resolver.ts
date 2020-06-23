import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../shared/auth.gaurd';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  async users(@Args('page') page: number) {
    return await this.userService.getAll(page);
  }

  @Query()
  async user(@Args('username') username: string) {
    return await this.userService.getOne(username);
  }

  @Query()
  @UseGuards(new AuthGuard())
  async whoami(@Context('user') user) {
    const { username } = user;
    return await this.userService.getOne(username);
  }

  @Mutation()
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user: UserDTO = { username, password };
    return await this.userService.login(user);
  }

  @Mutation()
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('role') role: number,
  ) {
    const user: UserDTO = { username, password, role };
    return await this.userService.register(user);
  }
}

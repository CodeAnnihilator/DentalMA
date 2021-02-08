import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { USER_REPOSITORY } from 'src/modules/core/constants';

@Injectable()
export class UsersService {

  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) {}

  async getShadowUser(name: string): Promise<User> {
    return await this.userRepository
      .findOne<User>({ where: { name } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository
      .findOne<User>({ where: { id } });
  }
}
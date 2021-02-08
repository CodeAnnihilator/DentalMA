import { User } from 'src/modules/users/user.entity';
import { Controller, Get } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

	constructor(private readonly userService: UsersService) { }

  @Get('shadow')
  public async getShadowUser(): Promise<User> {
    return await this.userService.getShadowUser('Uwe');
  }
}
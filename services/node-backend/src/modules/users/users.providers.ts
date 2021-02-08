import { User } from './user.entity';
import { USER_REPOSITORY } from 'src/modules/core/constants';

export const usersProviders = [{
  provide: USER_REPOSITORY,
  useValue: User,
}];
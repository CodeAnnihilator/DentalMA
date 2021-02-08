import { Sequelize } from 'sequelize-typescript';

import { User } from 'src/modules/users/user.entity';
import { Project } from 'src/modules/projects/project.entity';
import { SEQUELIZE } from '../constants';
import getDbConfig from '../utils/getDbConfig';

const databaseConfig = require('../../../../config/config')

export const databaseProviders = [{
  provide: SEQUELIZE,
  useFactory: async () => {
    const config = getDbConfig(databaseConfig);
    console.log(config)
    const sequelize = new Sequelize(config);
    sequelize.addModels([User, Project]);
    await sequelize.sync();
    return sequelize;
  },
}];
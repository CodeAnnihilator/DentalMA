import { Sequelize } from 'sequelize-typescript';

import { User } from 'src/modules/users/user.entity';
import { Project } from 'src/modules/projects/project.entity';
import { Measurement } from 'src/modules/measurements/measurement.entity';
import { Camera } from 'src/modules/cameras/camera.entity';
import { Analysis } from 'src/modules/analysis/analysis.entity';
import { SEQUELIZE } from '../constants';
import getDbConfig from '../utils/getDbConfig';

const databaseConfig = require('../../../../config/config')

export const databaseProviders = [{
  provide: SEQUELIZE,
  useFactory: async () => {
    const config = getDbConfig(databaseConfig);
    const sequelize = new Sequelize(config);
    // sequelize.sync({force: true});
    sequelize.addModels([
      User,
      Project,
      Measurement,
      Camera,
      Analysis
    ]);
    await sequelize.sync();
    return sequelize;
  },
}];
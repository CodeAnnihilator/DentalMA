import { Project } from './project.entity';
import { PROJECT_REPOSITORY } from 'src/modules/core/constants';

export const projectsProviders = [{
  provide: PROJECT_REPOSITORY,
  useValue: Project,
}];
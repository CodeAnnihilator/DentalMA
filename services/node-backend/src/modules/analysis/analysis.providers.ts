import { Analysis } from './analysis.entity';
import { ANALYSIS_REPOSITORY } from 'src/modules/core/constants';

export const analysisProviders = [{
  provide: ANALYSIS_REPOSITORY,
  useValue: Analysis,
}];
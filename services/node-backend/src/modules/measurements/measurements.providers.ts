import { Measurement } from './measurement.entity';
import { MEASUREMENT_REPOSITORY } from 'src/modules/core/constants';

export const measurementsProviders = [{
  provide: MEASUREMENT_REPOSITORY,
  useValue: Measurement,
}];
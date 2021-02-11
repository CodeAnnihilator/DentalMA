import { Camera } from './camera.entity';
import { CAMERA_REPOSITORY } from 'src/modules/core/constants';

export const camerasProviders = [{
  provide: CAMERA_REPOSITORY,
  useValue: Camera,
}];
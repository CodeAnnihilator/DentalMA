import { Injectable, Inject } from '@nestjs/common';

import { CameraDto } from './dto/camera.dto';
import { Camera } from './camera.entity';
import { CAMERA_REPOSITORY } from 'src/modules/core/constants';

@Injectable()
export class CamerasService {

  constructor(@Inject(CAMERA_REPOSITORY) private readonly cameraRepository: typeof Camera) {}

  async createCamera(camera: CameraDto): Promise<Camera> {
    return await this.cameraRepository
      .create<Camera>(camera);
  }

  async getAllCameras(): Promise<Camera[]> {
    return await this.cameraRepository
      .findAll<Camera>();
  }

  async getCameraById(id: number): Promise<Camera> {
    return await this.cameraRepository
      .findOne<Camera>({ where: { id } });
  }
}
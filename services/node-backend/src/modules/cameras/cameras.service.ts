import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';

import { CameraDto } from './dto/camera.dto';
import { Camera } from './camera.entity';
import { CAMERA_REPOSITORY } from 'src/modules/core/constants';

@Injectable()
export class CamerasService {

  constructor(@Inject(CAMERA_REPOSITORY) private readonly cameraRepository: typeof Camera) {}

  async createCamera(camera: CameraDto): Promise<Camera> {
    if (!camera.userId) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'provide user ID'
      }, HttpStatus.BAD_REQUEST);
    }
    return await this.cameraRepository
      .create<Camera>(camera);
  }

  async getAllCameras(): Promise<Camera[]> {
    return await this.cameraRepository.findAll<Camera>({
      where: { userId: 1 },
      order:[['createdAt','DESC']],
      limit: 1,
    });
  }

  async getCameraById(id: number): Promise<Camera> {
    return await this.cameraRepository
      .findOne<Camera>({ where: { id } });
  }
}
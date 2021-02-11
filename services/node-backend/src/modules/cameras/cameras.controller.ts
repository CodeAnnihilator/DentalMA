import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { CameraDto } from './dto/camera.dto';
import { Camera } from 'src/modules/cameras/camera.entity';
import { CamerasService } from './cameras.service';

@Controller('cameras')
export class CamerasController {

	constructor(private readonly cameraService: CamerasService) { }

  @Post()
  public async createCamera(@Body() camera: CameraDto): Promise<Camera> {
    return await this.cameraService.createCamera(camera)
  }

  @Get()
  public async getAllCameras(): Promise<Camera[]> {
    return await this.cameraService.getAllCameras();
  }

  @Get(':id')
  public async getCameraById(@Param('id') id: number): Promise<Camera> {
    return await this.cameraService.getCameraById(id);
  }
}
import { Module } from '@nestjs/common';

import { CamerasService } from './cameras.service';
import { CamerasController } from './cameras.controller';
import { camerasProviders } from './cameras.providers';

@Module({
  providers: [CamerasService, ...camerasProviders],
  controllers: [CamerasController],
  exports: [CamerasService],
})
export class CamerasModule {}

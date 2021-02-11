import { Module } from '@nestjs/common';

import { MeasurementsService } from './measurements.service';
import { MeasurementsController } from './measurements.controller';
import { measurementsProviders } from './measurements.providers';

@Module({
  providers: [MeasurementsService, ...measurementsProviders],
  controllers: [MeasurementsController],
  exports: [MeasurementsService],
})
export class MeasurementsModule {}

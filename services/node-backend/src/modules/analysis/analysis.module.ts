import { Module } from '@nestjs/common';

import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { analysisProviders } from './analysis.providers';

@Module({
  providers: [AnalysisService, ...analysisProviders],
  controllers: [AnalysisController],
  exports: [AnalysisService],
})
export class AnalysisModule {}

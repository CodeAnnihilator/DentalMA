import { Injectable, Inject } from '@nestjs/common';

import { AnalysisDto } from './dto/analysis.dto';
import { Analysis } from './analysis.entity';
import { ANALYSIS_REPOSITORY } from 'src/modules/core/constants';

@Injectable()
export class AnalysisService {

  constructor(@Inject(ANALYSIS_REPOSITORY) private readonly analysisRepository: typeof Analysis) {}

  async createAnalysis(analysis: AnalysisDto): Promise<Analysis> {
    return await this.analysisRepository
      .create<Analysis>(analysis);
  }

  async getAllAnalysis(): Promise<Analysis[]> {
    return await this.analysisRepository
      .findAll<Analysis>();
  }

  async getAnalysisById(id: number): Promise<Analysis> {
    return await this.analysisRepository
      .findOne<Analysis>({ where: { id } });
  }
}
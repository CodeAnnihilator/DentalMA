import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { AnalysisDto } from './dto/analysis.dto';
import { Analysis } from 'src/modules/analysis/analysis.entity';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {

	constructor(private readonly analysisService: AnalysisService) { }

  @Post()
  public async createAnalysis(@Body() data: AnalysisDto): Promise<Analysis> {
    return await this.analysisService.createAnalysis(data)
  }

  @Get()
  public async getAllAnalysis(): Promise<Analysis[]> {
    return await this.analysisService.getAllAnalysis();
  }

  @Get(':id')
  public async getAnalysisById(@Param('id') id: number): Promise<Analysis> {
    return await this.analysisService.getAnalysisById(id);
  }
}
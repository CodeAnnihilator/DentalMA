import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { Request } from 'express';

import { MeasurementDto } from './dto/measurements.dto';
import { Measurement } from './measurement.entity';
import { MeasurementsService } from './measurements.service';


@Controller('measurements')
export class MeasurementsController {

	constructor(private readonly measurementService: MeasurementsService) { }

  @Post()
  public async createMeasurement(@Body() measurement: MeasurementDto): Promise<Measurement> {
    return await this.measurementService.createMeasurement(measurement)
  }

  @Put()
  public async updateMeasurement(@Body() measurement: MeasurementDto): Promise<Measurement> {
    return await this.measurementService.updateMeasurement(measurement)
  }

  @Get()
  public async getAllMeasurements(@Query() query: MeasurementDto): Promise<Measurement[]> {
    return await this.measurementService.getAllMeasurements(query.projectId);
  }

  @Get('/excel')
  public async getAllMeasurementsExcelMQs(@Query() query: MeasurementDto): Promise<Measurement[]> {
    return await this.measurementService.getAllMeasurementsExcelMQs(query.projectId);
  }

  @Get('/last')
  public async getLastMeasurement(): Promise<Measurement[]> {
    return await this.measurementService.getLastMeasurement();
  }

  @Get(':id')
  public async getMeasurementById(@Param('id') id: number): Promise<Measurement> {
    return await this.measurementService.getMeasurementById(id);
  }

  @Delete(':id')
  public async deleteMeasurement(@Param('id') id: number): Promise<number> {
    return await this.measurementService.deleteMeasurement(id);
  }
}
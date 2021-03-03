import { Op } from 'sequelize';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { MeasurementDto } from './dto/measurements.dto';
import { MEASUREMENT_REPOSITORY } from 'src/modules/core/constants';

import { Analysis } from 'src/modules/analysis/analysis.entity';
import { Measurement } from './measurement.entity';

@Injectable()
export class MeasurementsService {

  constructor(@Inject(MEASUREMENT_REPOSITORY) private readonly measurementRepository: typeof Measurement) {}

  async createMeasurement(measurement: MeasurementDto): Promise<Measurement> {
    return await this.measurementRepository
      .create<Measurement>(measurement);
  }

  async updateMeasurement(measurement: MeasurementDto): Promise<Measurement> {
    return await this.measurementRepository
      .update<Measurement>(measurement, { where: { id: measurement.id } })
      .then(async _ => await this.getMeasurementById(measurement.id))
  }

  async getAllMeasurements(projectId: number): Promise<Measurement[]> {
    return await this.measurementRepository
      .findAll<Measurement>({ where: { projectId }});
  }

  async getAllMeasurementsExcelMQs(projectId: number): Promise<Measurement[]> {
    const data = await this.measurementRepository
      .findAll<Measurement>({ where: { projectId }, include: Analysis });
    
    if (!data) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'measurement does not esist'
      }, HttpStatus.BAD_REQUEST);
    }

    const formattedData = data.reduce((c, n) => {
      const {createdAt, updatedAt, projectId, analysis, ...m} = n.toJSON() as any;
      if (!n.analysis[0]) return c;
      const newAnalysis = n.analysis[0].data.map((a: any) => ({...a, ...m}));
      const newC = c.concat(newAnalysis);
      return newC;
    }, []);
   
    return formattedData;

  }


  async getLastMeasurement(): Promise<Measurement[]> {
    return await this.measurementRepository.findAll<Measurement>({
      where: { groupId: { [Op.not]: null } },
      order:[['createdAt','DESC']],
      limit: 1,
    });
  }

  async getMeasurementById(id: number): Promise<Measurement> {
    const measurement = await this.measurementRepository.findOne<Measurement>({
      where: { id }
    });
    if (!measurement) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'measurement does not esist'
      }, HttpStatus.BAD_REQUEST);
    }
    return measurement;
  }

  async deleteMeasurement(id: number): Promise<number> {
    return await this.measurementRepository
      .destroy<Measurement>({ where: { id } });
  }

}

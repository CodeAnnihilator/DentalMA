import { MeasurementDto } from './dto/measurements.dto';
import { Injectable, Inject } from '@nestjs/common';
import { Measurement } from './measurement.entity';
import { MEASUREMENT_REPOSITORY } from 'src/modules/core/constants';
import { Op } from 'sequelize';

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
      .findAll<Measurement>({ where: { projectId } });
  }

  async getLastMeasurement(): Promise<Measurement[]> {
    return await this.measurementRepository.findAll<Measurement>({
      // where: { userId: 1 },
      where: { groupId: { [Op.not]: null } },
      order:[['createdAt','DESC']],
      limit: 1,
    });
  }

  async getMeasurementById(id: number): Promise<Measurement> {
    return await this.measurementRepository
      .findOne<Measurement>({ where: { id } });
  }
}
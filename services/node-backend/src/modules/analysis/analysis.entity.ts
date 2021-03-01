import { Table, Model, Column, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Measurement } from '../measurements/measurement.entity';

@Table
export class Analysis extends Model {

  @Column(DataType.JSON) data: any;

  @ForeignKey(() => Measurement)
  @Column
  measurementId: number;

  @BelongsTo(() => Measurement)
  measurement: Measurement;

}
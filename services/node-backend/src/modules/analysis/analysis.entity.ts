import { Table, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Measurement } from '../measurements/measurement.entity';

@Table
export class Analysis extends Model {

  @Column
  mq: number;

  @Column
  value: number;

  @ForeignKey(() => Measurement)
  @Column
  measurementId: number;

  @BelongsTo(() => Measurement)
  measurement: Measurement;

}
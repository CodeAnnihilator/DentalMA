import { Table, Model, Column, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Camera extends Model {

  @Column
  device_name: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  calibrationX1: number;
  
  @Column({ type: DataType.DECIMAL(10, 2) })
  calibrationY1: number;

  @Column({ type: DataType.DECIMAL(10, 2) })
  calibrationX2: number;

  @Column({ type: DataType.DECIMAL(10, 2) })
  calibrationY2: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

}
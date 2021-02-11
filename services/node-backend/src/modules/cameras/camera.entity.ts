import { Table, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Camera extends Model {

  @Column
  device_name: string;

  @Column
  last_used_at: Date;

  @Column
  magnificationX1: number;

  @Column
  magnificationY1: number;

  @Column
  magnificationX2: number;

  @Column
  magnificationY2: number;

  @Column
  calibrationX1: number;
  
  @Column
  calibrationY1: number;

  @Column
  calibrationX2: number;

  @Column
  calibrationY2: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

}
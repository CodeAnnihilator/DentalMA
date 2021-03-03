import { Table, Model, DataType, Column, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';

import { User } from '../users/user.entity';
import { Measurement } from '../measurements/measurement.entity';

@Table
export class Project extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Measurement, { onDelete: 'cascade', hooks:true })
  measurement: Measurement[];

}
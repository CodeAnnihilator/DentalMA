import { Table, Model, DataType, Column, HasMany } from 'sequelize-typescript';
import { Project } from '../projects/project.entity';
import { Camera } from '../cameras/camera.entity';

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @HasMany(() => Project)
  projects: Project[];

  @HasMany(() => Camera)
  cameras: Camera[];
}
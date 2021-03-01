import { Table, Model, Column, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Project } from '../projects/project.entity';
import { Analysis } from '../analysis/analysis.entity';

@Table
export class Measurement extends Model {

  @Column
  name: string;

  @Column
  groupId: number;

  @Column
  toothId: number;

  @Column
  time: number;

  @Column
  substrate: number;

  @Column
  location: number;

  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;

  @HasMany(() => Analysis)
  analysis: Analysis[];
}
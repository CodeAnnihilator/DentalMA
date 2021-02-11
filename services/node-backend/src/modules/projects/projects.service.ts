import { ProjectDto } from './dto/project.dto';
import { Injectable, Inject } from '@nestjs/common';
import { Project } from './project.entity';
import { PROJECT_REPOSITORY } from 'src/modules/core/constants';

@Injectable()
export class ProjectsService {

  constructor(@Inject(PROJECT_REPOSITORY) private readonly projectRepository: typeof Project) {}

  async createProject(project: ProjectDto): Promise<Project> {
    return await this.projectRepository
      .create<Project>(project);
  }

  async getAllProjects(): Promise<Project[]> {
    return await this.projectRepository
      .findAll<Project>();
  }

  async getProjectById(id: number): Promise<Project> {
    return await this.projectRepository
      .findOne<Project>({ where: { id } });
  }

  async updateProject(project: ProjectDto): Promise<Project> {
    return await this.projectRepository
      .update<Project>(project, { where: { id: project.id } })
      .then(async (_) => await this.getProjectById(project.id))
  }

  async deleteProject(id: number): Promise<number> {
    return await this.projectRepository
      .destroy<Project>({ where: { id } });
  }
}
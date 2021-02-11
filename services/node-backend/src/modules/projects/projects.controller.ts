import { ProjectDto } from './dto/project.dto';
import { Project } from 'src/modules/projects/project.entity';
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {

	constructor(private readonly projectService: ProjectsService) { }

  @Post()
  public async createProject(@Body() project: ProjectDto): Promise<Project> {
    return await this.projectService.createProject(project)
  }

  @Put()
  public async updateProject(@Body() project: ProjectDto): Promise<Project> {
    console.log(project)
    return await this.projectService.updateProject(project)
  }

  @Get()
  public async getAllProjects(): Promise<Project[]> {
    return await this.projectService.getAllProjects();
  }

  @Get(':id')
  public async getProjectById(@Param('id') id: number): Promise<Project> {
    return await this.projectService.getProjectById(id);
  }

  @Delete(':id')
  public async deleteProject(@Param('id') id: number): Promise<number> {
    return await this.projectService.deleteProject(id);
  }
}
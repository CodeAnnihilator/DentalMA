import { Module } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { projectsProviders } from './projects.providers';

@Module({
  providers: [ProjectsService, ...projectsProviders],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}

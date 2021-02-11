import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from 'src/modules/core/database/database.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { MeasurementsModule } from './modules/measurements/measurements.module';
import { AnalysisModule } from './modules/analysis/analysis.module';
import { CamerasModule } from './modules/cameras/cameras.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ProjectsModule,
    MeasurementsModule,
    AnalysisModule,
    CamerasModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

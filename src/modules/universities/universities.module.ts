import { Module } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { University } from './entities/university.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UniversitiesRepository } from './universities.repository';
import { User } from '../user/models/user.model';

@Module({
  controllers: [UniversitiesController],
  providers: [UniversitiesService, UniversitiesRepository],
  imports: [SequelizeModule.forFeature([University, User])],
})
export class UniversitiesModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { UniversitiesController } from './universities.controller';
import { UniversitiesService } from './universities.service';
import { UniversitiesRepository } from './universities.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { University } from './entities/university.entity';
import { User } from '../user/entities/user.entity';
import { Event } from '../events/entities/event.entity';

describe('UniversitiesController', () => {
  let controller: UniversitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversitiesController],
      providers: [UniversitiesService, UniversitiesRepository],
      imports: [SequelizeModule.forFeature([University, User, Event])],
    }).compile();

    controller = module.get<UniversitiesController>(UniversitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

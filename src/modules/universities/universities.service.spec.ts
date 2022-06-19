import { Test, TestingModule } from '@nestjs/testing';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { UniversitiesRepository } from './universities.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { University } from './entities/university.entity';
import { User } from '../user/entities/user.entity';
import { Event } from '../events/entities/event.entity';

describe('UniversitiesService', () => {
  let service: UniversitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversitiesController],
      providers: [UniversitiesService, UniversitiesRepository],
      imports: [SequelizeModule.forFeature([University, User, Event])],
    }).compile();

    service = module.get<UniversitiesService>(UniversitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

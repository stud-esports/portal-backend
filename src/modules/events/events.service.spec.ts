import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventRepository } from './event.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './entities/event.entity';
import { User } from '../user/entities/user.entity';
import { University } from '../universities/entities/university.entity';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService, EventRepository],
      imports: [SequelizeModule.forFeature([Event, User, University])],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

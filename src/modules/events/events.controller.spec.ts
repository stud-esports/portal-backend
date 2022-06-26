import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventRepository } from './event.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './entities/event.entity';
import { User } from '../user/entities/user.entity';
import { University } from '../universities/entities/university.entity';

describe('EventsController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService, EventRepository],
      imports: [SequelizeModule.forFeature([Event, User, University])],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

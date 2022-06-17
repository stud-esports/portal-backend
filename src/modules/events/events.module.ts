import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventRepository } from './event.repository';
import { Event } from './entities/event.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { University } from '../universities/entities/university.entity';
import { User } from '../user/entities/user.entity';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventRepository],
  imports: [SequelizeModule.forFeature([Event, User, University])],
})
export class EventsModule {}

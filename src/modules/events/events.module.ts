import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventRepository } from './event.repository';
import { EventModel } from './entities/event.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { University } from '../universities/entities/university.entity';
import { User } from '../user/models/user.model';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventRepository],
  imports: [SequelizeModule.forFeature([EventModel, User, University])],
})
export class EventsModule {}

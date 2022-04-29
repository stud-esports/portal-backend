import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventRepository } from './event.repository';
import { EventModel } from './entities/event.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventRepository],
  imports: [SequelizeModule.forFeature([EventModel])],
})
export class EventsModule {}

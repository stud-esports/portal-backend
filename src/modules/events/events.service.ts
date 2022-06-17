import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventRepository } from './event.repository';

@Injectable()
export class EventsService {
  constructor(private _eventRepository: EventRepository) {}

  create(createEventDto: CreateEventDto) {
    const start = this.prepareDateForDatabase(createEventDto.start);
    const end = this.prepareDateForDatabase(createEventDto.end);
    return this._eventRepository.create({ ...createEventDto, start, end });
  }

  findAll(user: User, filters?: { university_id: string }) {
    return this._eventRepository.findAll(user, filters);
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    const start = this.prepareDateForDatabase(updateEventDto.start);
    const end = this.prepareDateForDatabase(updateEventDto.end);
    return this._eventRepository.update(id, { ...updateEventDto, start, end });
  }

  remove(id: number) {
    return this._eventRepository.deleteById(id);
  }

  prepareDateForDatabase(date: string): string {
    const currDate = new Date(date);
    const timezoneOffset = Math.abs(currDate.getTimezoneOffset() / 60);
    const finalDate = new Date(
      currDate.setHours(
        currDate.getHours() + timezoneOffset,
        currDate.getMinutes(),
        currDate.getSeconds(),
        currDate.getMilliseconds(),
      ),
    ).toISOString();

    return finalDate;
  }
}

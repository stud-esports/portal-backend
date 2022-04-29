import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventRepository } from './event.repository';

@Injectable()
export class EventsService {
  constructor(private _eventRepository: EventRepository) {}

  create(createEventDto: CreateEventDto) {
    const date = this.prepareDateForDatabase(createEventDto.date);
    return this._eventRepository.create({ ...createEventDto, date });
  }

  findAll() {
    return this._eventRepository.findAll();
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    const date = this.prepareDateForDatabase(updateEventDto.date);
    return this._eventRepository.update(id, { ...updateEventDto, date });
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

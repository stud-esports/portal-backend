import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventModel } from './entities/event.entity';

@Injectable()
export class EventRepository {
  constructor(@InjectModel(EventModel) private event: typeof EventModel) {}

  public async create(createEventDto: CreateEventDto) {
    return this.event.create({ ...createEventDto });
  }

  public async findAll(): Promise<EventModel[] | null> {
    return this.event.findAll();
  }

  public async deleteById(id: number): Promise<number | null> {
    return this.event.destroy({ where: { _id: id } });
  }

  public async update(
    id: number,
    dto: UpdateEventDto,
  ): Promise<[affectedCount: number]> {
    return this.event.update(dto, { where: { _id: id } });
  }
}

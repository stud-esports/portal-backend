import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { University } from '../universities/entities/university.entity';
import { User } from '../user/models/user.model';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventModel } from './entities/event.entity';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(EventModel) private event: typeof EventModel,
    @InjectModel(User) private _userRepository: typeof User,
  ) {}

  public async create(createEventDto: CreateEventDto) {
    return this.event.create({ ...createEventDto });
  }

  public async findAll(
    user: User,
    filters?: {
      university_id: string;
    },
  ): Promise<EventModel[] | null> {
    const curUserRoles = await this._userRepository
      .scope(['withRole'])
      .findOne({
        where: { _id: user._id },
      });
    const roles = [
      curUserRoles?.roles[0]?.getDataValue('name'),
      curUserRoles?.roles[1]?.getDataValue('name'),
      curUserRoles?.roles[2]?.getDataValue('name'),
    ];

    if (filters.university_id) {
      return this.event.findAll({
        where: { event_university_id: +filters.university_id },
        include: [
          {
            model: University,
            as: 'event_university',
          },
        ],
      });
    } else if (roles.includes('moderator')) {
      return this.event.findAll({
        where: { event_university_id: null },
        include: [
          {
            model: University,
            as: 'event_university',
          },
        ],
      });
    } else {
      return this.event.findAll({
        include: [
          {
            model: University,
            as: 'event_university',
          },
        ],
      });
    }
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

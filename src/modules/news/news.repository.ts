import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { University } from '../universities/entities/university.entity';
import { User } from '../user/models/user.model';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsRepository {
  constructor(
    @InjectModel(News) private news: typeof News,
    @InjectModel(User) private _userRepository: typeof User,
  ) {}

  public async findAll(
    user: User,
    filters?: {
      university_id: string;
    },
  ): Promise<News[] | null> {
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
      return this.news.findAll({
        where: { university_id: +filters.university_id },
        include: [
          {
            model: University,
            as: 'university',
          },
        ],
      });
    } else if (roles.includes('moderator')) {
      return this.news.findAll({
        where: { university_id: null },
        include: [
          {
            model: University,
            as: 'university',
          },
        ],
      });
    } else {
      return this.news.findAll({
        include: [
          {
            model: University,
            as: 'university',
          },
        ],
      });
    }
  }

  public async create({ ...dto }: CreateNewsDto): Promise<News> {
    return this.news.create({
      ...dto,
    });
  }

  public async findById(id: number): Promise<News | null> {
    return this.news.findOne({
      where: { _id: id },
    });
  }

  public async deleteById(id: number): Promise<number | null> {
    return this.news.destroy({ where: { _id: id } });
  }

  public async update(
    id: number,
    dto: UpdateNewsDto,
  ): Promise<[affectedCount: number]> {
    return this.news.update(dto, { where: { _id: id } });
  }
}

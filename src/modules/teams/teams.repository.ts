import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { Game } from '../games/entities/game.entity';
import { University } from '../universities/entities/university.entity';
import { User } from '../user/entities/user.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamRepository {
  constructor(
    @InjectModel(Team) private team: typeof Team,
    @InjectModel(User) private _userRepository: typeof User,
  ) {}

  public async create(createGameDto: CreateTeamDto) {
    return this.team.create({ ...createGameDto });
  }

  public async findAll(
    user: User,
    filters?: {
      university_id: string;
    },
  ): Promise<Team[] | null> {
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
      return this.team.findAll({
        where: { university_id: +filters.university_id },
        include: [
          {
            model: User,
            as: 'members',
          },
          {
            model: User,
            as: 'captain',
          },
          {
            model: Game,
            as: 'game',
          },
          {
            model: University,
            as: 'team_university',
          },
        ],
      });
    } else if (roles.includes('moderator')) {
      return this.team.findAll({
        where: { university_id: null },
        include: [
          {
            model: User,
            as: 'members',
          },
          {
            model: User,
            as: 'captain',
          },
          {
            model: Game,
            as: 'game',
          },
          {
            model: University,
            as: 'team_university',
          },
        ],
      });
    } else {
      return this.team.findAll({
        include: [
          {
            model: User,
            as: 'members',
          },
          {
            model: User,
            as: 'captain',
          },
          {
            model: Game,
            as: 'game',
          },
          {
            model: University,
            as: 'team_university',
          },
        ],
      });
    }
  }

  public async findOne(id: number) {
    return this.team.findOne({
      include: [
        {
          model: User,
          as: 'members',
        },
        {
          model: User,
          as: 'captain',
        },
        {
          model: Game,
          as: 'game',
        },
      ],
      where: { _id: id },
    });
  }

  public async deleteById(id: number): Promise<number | null> {
    return this.team.destroy({ where: { _id: id } });
  }

  public async update(
    id: number,
    dto: UpdateTeamDto,
  ): Promise<[affectedCount: number]> {
    return this.team.update(dto, { where: { _id: id } });
  }

  public async findByKeyword(params: { text: string }): Promise<Team[] | null> {
    const text = params.text.trim().toLocaleLowerCase();
    return this.team.findAll({
      where: {
        [Op.or]: [
          sequelize.where(
            sequelize.fn('lower', sequelize.col('title')),
            'LIKE',
            '%' + text + '%',
          ),
        ],
      },
    });
  }
}

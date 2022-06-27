import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { Game } from '../games/entities/game.entity';
import { University } from '../universities/entities/university.entity';
import { User } from '../user/entities/user.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team_member.entity';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Injectable()
export class TeamRepository {
  constructor(
    @InjectModel(Team) private team: typeof Team,
    @InjectModel(TeamMember) private teamMember: typeof TeamMember,
    @InjectModel(User) private _userRepository: typeof User,
  ) {}

  public async create(createGameDto: CreateTeamDto) {
    const team = await this.team.findOne({
      where: { title: createGameDto.title },
    });
    if (team) {
      throw new HttpException(
        `Команда с таким названием уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.team.create({ ...createGameDto });
  }

  public async createMember(createGameDto: CreateTeamMemberDto) {
    return this.teamMember.create({ ...createGameDto });
  }

  public async updateMember(
    id: number,
    dto: UpdateTeamMemberDto,
  ): Promise<[affectedCount: number]> {
    return this.teamMember.update(dto, { where: { _id: id } });
  }

  public async findAll(
    user: User,
    filters?: {
      university_id: string;
    },
  ): Promise<Team[] | null> {
    const curUserRoles = await this._userRepository
      .scope(['defaultScope'])
      .findOne({
        where: { _id: user._id },
      });
    const roles = [
      curUserRoles?.roles[0]?.getDataValue('name'),
      curUserRoles?.roles[1]?.getDataValue('name'),
      curUserRoles?.roles[2]?.getDataValue('name'),
    ];

    if (filters.university_id) {
      return this.team.scope(['defaultScope']).findAll({
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
            as: 'university',
          },
        ],
      });
    } else if (roles.includes('moderator')) {
      return this.team.scope(['defaultScope']).findAll({
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
            as: 'university',
          },
        ],
      });
    } else {
      return this.team.scope(['defaultScope']).findAll({
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
            as: 'university',
          },
        ],
      });
    }
  }

  public async findOne(id: number) {
    return this.team.scope(['defaultScope']).findOne({
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
    const oldTeam = await this.team.findOne({
      include: [
        {
          model: User,
          as: 'members',
        },
      ],
      where: { _id: id },
    });
    if (dto.members_count < oldTeam.members.length) {
      throw new HttpException(
        `Новое значение количества участников не может быть меньше, чем текущее количество привязанных к команде участников. Удалите часть участников и после этого вы сможете обновить количество участников на желаемое`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (oldTeam.title === dto.title) {
      throw new HttpException(
        `Команда с таким названием уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.team.update(dto, { where: { _id: id } });
  }

  public async findByKeyword(params: { text: string }): Promise<Team[] | null> {
    const text = params.text.trim().toLocaleLowerCase();
    return this.team.scope(['defaultScope']).findAll({
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

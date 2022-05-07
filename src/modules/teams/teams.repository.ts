import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { Game } from '../games/entities/game.entity';
import { User } from '../user/models/user.model';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamRepository {
  constructor(@InjectModel(Team) private team: typeof Team) {}

  public async create(createGameDto: CreateTeamDto) {
    return this.team.create({ ...createGameDto });
  }

  public async findAll(): Promise<Team[] | null> {
    return this.team.findAll({ include: [
      {
        model: User,
        as: 'captain',
      },
      {
        model: Game,
        as: 'game',
      },
    ],});
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

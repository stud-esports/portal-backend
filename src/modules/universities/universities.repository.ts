import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { Game } from '../games/entities/game.entity';
import { User } from '../user/models/user.model';
import { University } from './entities/university.entity';

@Injectable()
export class UniversitiesRepository {
  constructor(@InjectModel(University) private university: typeof University) {}

  //   public async create(createGameDto: CreateTeamDto) {
  //     return this.team.create({ ...createGameDto });
  //   }

  public async findAll(): Promise<University[] | null> {
    return this.university.findAll({
      //   include: [
      //     {
      //       model: User,
      //       as: 'members',
      //     },
      //     {
      //       model: User,
      //       as: 'captain',
      //     },
      //     {
      //       model: Game,
      //       as: 'game',
      //     },
      //   ],
    });
  }

  //   public async findOne(id: number) {
  //     return this.team.findOne({
  //       include: [
  //         {
  //           model: User,
  //           as: 'members',
  //         },
  //         {
  //           model: User,
  //           as: 'captain',
  //         },
  //         {
  //           model: Game,
  //           as: 'game',
  //         },
  //       ],
  //       where: { _id: id },
  //     });
  //   }

  //   public async deleteById(id: number): Promise<number | null> {
  //     return this.team.destroy({ where: { _id: id } });
  //   }

  //   public async update(
  //     id: number,
  //     dto: UpdateTeamDto,
  //   ): Promise<[affectedCount: number]> {
  //     return this.team.update(dto, { where: { _id: id } });
  //   }

  //   public async findByKeyword(params: { text: string }): Promise<Team[] | null> {
  //     const text = params.text.trim().toLocaleLowerCase();
  //     return this.team.findAll({
  //       where: {
  //         [Op.or]: [
  //           sequelize.where(
  //             sequelize.fn('lower', sequelize.col('title')),
  //             'LIKE',
  //             '%' + text + '%',
  //           ),
  //         ],
  //       },
  //     });
  //   }
}

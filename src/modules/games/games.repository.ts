import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameRepository {
  constructor(@InjectModel(Game) private game: typeof Game) {}

  public async create(createGameDto: CreateGameDto) {
    return this.game.create({ ...createGameDto });
  }

  public async findAll(): Promise<Game[] | null> {
    return this.game.findAll();
  }

  public async deleteById(id: number): Promise<number | null> {
    return this.game.destroy({ where: { _id: id } });
  }

  public async update(
    id: number,
    dto: UpdateGameDto,
  ): Promise<[affectedCount: number]> {
    return this.game.update(dto, { where: { _id: id } });
  }

  public async findByKeyword(params: { text: string }): Promise<Game[] | null> {
    const text = params.text.trim().toLocaleLowerCase();
    return this.game.findAll({
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

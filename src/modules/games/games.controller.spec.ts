import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GameRepository } from './games.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './entities/game.entity';
import { Team } from '../teams/entities/team.entity';

describe('GamesController', () => {
  let controller: GamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [GamesService, GameRepository],
      exports: [GamesService],
      imports: [SequelizeModule.forFeature([Game, Team])],
    }).compile();

    controller = module.get<GamesController>(GamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

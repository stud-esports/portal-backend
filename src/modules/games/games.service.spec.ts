import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { GameRepository } from './games.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './entities/game.entity';
import { Team } from '../teams/entities/team.entity';

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [GamesService, GameRepository],
      exports: [GamesService],
      imports: [SequelizeModule.forFeature([Game, Team])],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

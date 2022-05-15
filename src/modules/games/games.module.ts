import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './entities/game.entity';
import { GameRepository } from './games.repository';
import { Team } from '../teams/entities/team.entity';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GameRepository],
  exports: [GamesService],
  imports: [SequelizeModule.forFeature([Game, Team])],
})
export class GamesModule {}

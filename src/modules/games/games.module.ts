import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './entities/game.entity';
import { GameRepository } from './games.repository';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GameRepository],
  imports: [SequelizeModule.forFeature([Game])],
})
export class GamesModule {}

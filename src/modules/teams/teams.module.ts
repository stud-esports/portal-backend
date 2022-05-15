import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TeamRepository } from './teams.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from '../games/entities/game.entity';
import { User } from '../user/models/user.model';
import { Team } from './entities/team.entity';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, TeamRepository],
  exports: [TeamsService],
  imports: [SequelizeModule.forFeature([Team, Game, User])],
})
export class TeamsModule {}

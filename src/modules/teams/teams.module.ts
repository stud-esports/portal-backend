import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TeamRepository } from './teams.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from '../games/entities/game.entity';
import { User } from '../user/models/user.model';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team_member.entity';
import { Application } from '../applications/entities/application.entity';
import { University } from '../universities/entities/university.entity';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, TeamRepository],
  exports: [TeamsService],
  imports: [
    SequelizeModule.forFeature([
      Team,
      Game,
      User,
      TeamMember,
      Application,
      University,
    ]),
  ],
})
export class TeamsModule {}

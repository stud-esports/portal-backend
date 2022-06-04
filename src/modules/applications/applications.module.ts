import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/models/user.model';
import { ApplicationRepository } from './application.repository';
import { Application } from './entities/application.entity';
import { Team } from '../teams/entities/team.entity';
import { TeamMember } from '../teams/entities/team_member.entity';

@Module({
  controllers: [ApplicationsController],
  exports: [ApplicationsService],
  providers: [ApplicationsService, ApplicationRepository],
  imports: [SequelizeModule.forFeature([User, Application, Team, TeamMember])],
})
export class ApplicationsModule {}

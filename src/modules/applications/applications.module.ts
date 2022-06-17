import { forwardRef, Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { ApplicationRepository } from './application.repository';
import { Application } from './entities/application.entity';
import { Team } from '../teams/entities/team.entity';
import { TeamMember } from '../teams/entities/team_member.entity';
import { University } from '../universities/entities/university.entity';
import { TeamsModule } from '../teams/teams.module';

@Module({
  controllers: [ApplicationsController],
  exports: [ApplicationsService],
  providers: [ApplicationsService, ApplicationRepository],
  imports: [
    SequelizeModule.forFeature([
      User,
      Application,
      Team,
      TeamMember,
      University,
      User,
    ]),
    forwardRef(() => TeamsModule),
  ],
})
export class ApplicationsModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationRepository } from './application.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { Application } from './entities/application.entity';
import { Team } from '../teams/entities/team.entity';
import { TeamMember } from '../teams/entities/team_member.entity';
import { University } from '../universities/entities/university.entity';
import { forwardRef } from '@nestjs/common';
import { TeamsModule } from '../teams/teams.module';

describe('ApplicationsController', () => {
  let controller: ApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<ApplicationsController>(ApplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { ApplicationRepository } from './application.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { Application } from './entities/application.entity';
import { Team } from '../teams/entities/team.entity';
import { TeamMember } from '../teams/entities/team_member.entity';
import { University } from '../universities/entities/university.entity';
import { forwardRef } from '@nestjs/common';
import { TeamsModule } from '../teams/teams.module';

describe('ApplicationsService', () => {
  let service: ApplicationsService;

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

    service = module.get<ApplicationsService>(ApplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

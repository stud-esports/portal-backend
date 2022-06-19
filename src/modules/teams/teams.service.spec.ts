import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TeamRepository } from './teams.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Team } from './entities/team.entity';
import { Game } from '../games/entities/game.entity';
import { User } from '../user/entities/user.entity';
import { TeamMember } from './entities/team_member.entity';
import { Application } from '../applications/entities/application.entity';
import { University } from '../universities/entities/university.entity';

describe('TeamsService', () => {
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamsService, TeamRepository],
      controllers: [TeamsController],
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
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

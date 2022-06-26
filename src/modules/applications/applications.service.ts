import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TeamMember } from '../teams/entities/team_member.entity';
import { TeamsService } from '../teams/teams.service';
import { User } from '../user/entities/user.entity';
import { ApplicationRepository } from './application.repository';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    private _applicationRepository: ApplicationRepository,
    private teamsService: TeamsService,
    @InjectModel(TeamMember) private _teamMemberRepository: typeof TeamMember,
  ) {}

  create(createApplicationDto: CreateApplicationDto) {
    return this._applicationRepository.create(createApplicationDto);
  }

  findAll(
    user: User,
    filters: {
      user_id: string;
      team_type: string;
      university_id: string;
    },
  ) {
    return this._applicationRepository.findAll(user, filters);
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }

  async approveApplication(id, { user_id, team_id, commentary }) {
    console.log(user_id, team_id);
    await this._applicationRepository.approveApplication(
      id,
      user_id,
      team_id,
      commentary,
    );

    return this.teamsService.setTeamMember({
      user_id,
      team_id,
    });
  }

  declineApplication(id, { user_id, team_id, commentary }) {
    return this._applicationRepository.declineApplication(
      id,
      user_id,
      team_id,
      commentary,
    );
  }
}

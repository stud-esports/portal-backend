import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamMember } from './entities/team_member.entity';
import { TeamRepository } from './teams.repository';

@Injectable()
export class TeamsService {
  constructor(
    private _teamRepository: TeamRepository,
    @InjectModel(TeamMember) private _teamMemberRepository: typeof TeamMember,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    return this._teamRepository.create(createTeamDto);
  }

  findAll(user: User, filters?: { university_id: string }) {
    return this._teamRepository.findAll(user, filters);
  }

  findOne(id: number) {
    return this._teamRepository.findOne(id);
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this._teamRepository.update(id, updateTeamDto);
  }

  remove(id: number) {
    return this._teamRepository.deleteById(id);
  }

  async setTeamMember({ user_id, team_id }) {
    const isUserMemberAlready = await this._teamMemberRepository.findOne({
      where: {
        user_id,
        team_id,
      },
    });

    const team = await this._teamRepository.findOne(team_id);

    if (!!isUserMemberAlready) {
      throw new HttpException(
        `Пользователь уже является участником`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (team.members.length === team.members_count) {
      throw new HttpException(
        `Достигнуто максимальное количество участников`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this._teamMemberRepository.create({
      user_id,
      team_id,
    });
  }

  async deleteTeamMember({ user_id, team_id }) {
    await this._teamMemberRepository.destroy({
      where: {
        user_id,
        team_id,
      },
    });
  }
}

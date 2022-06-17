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

  async setTeamMember({ user_id, team_id }): Promise<TeamMember> {
    const isUserMemberAlready = await this._teamMemberRepository.findOne({
      where: {
        user_id,
        team_id,
        is_active: true,
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

    return await this._teamRepository.createMember({
      user_id,
      team_id,
      joined_at: new Date(),
    });
  }

  async deleteTeamMember({ user_id, team_id }) {
    const member = await this._teamMemberRepository.findOne({
      where: {
        user_id,
        team_id,
        is_active: true,
      },
    });

    if (!member) {
      throw new HttpException(
        `Участника с такими данными нет`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this._teamRepository.updateMember(member._id, {
      left_at: new Date(),
      is_active: false,
    });
  }
}

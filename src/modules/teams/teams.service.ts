import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamRepository } from './teams.repository';

@Injectable()
export class TeamsService {
  constructor(private _teamRepository: TeamRepository) {}

  create(createTeamDto: CreateTeamDto) {
    return this._teamRepository.create(createTeamDto);
  }

  findAll() {
    return this._teamRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this._teamRepository.update(id, updateTeamDto);
  }

  remove(id: number) {
    return this._teamRepository.deleteById(id);
  }
}

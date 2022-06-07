import { Injectable } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { UniversitiesRepository } from './universities.repository';

@Injectable()
export class UniversitiesService {
  constructor(private _universitiesRepository: UniversitiesRepository) {}

  create(createUniversityDto: CreateUniversityDto) {
    return 'This action adds a new university';
  }

  findAll() {
    return this._universitiesRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} university`;
  }

  update(id: number, updateUniversityDto: UpdateUniversityDto) {
    return `This action updates a #${id} university`;
  }

  remove(id: number) {
    return `This action removes a #${id} university`;
  }
}

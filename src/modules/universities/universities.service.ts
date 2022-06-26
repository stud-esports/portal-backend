import { Injectable } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { UniversitiesRepository } from './universities.repository';

@Injectable()
export class UniversitiesService {
  constructor(private _universitiesRepository: UniversitiesRepository) {}

  create(createUniversityDto: CreateUniversityDto) {
    return this._universitiesRepository.create(createUniversityDto);
  }

  findAll() {
    return this._universitiesRepository.findAll();
  }

  findOne(id: number) {
    return this._universitiesRepository.findOne(id);
  }

  update(id: number, updateUniversityDto: UpdateUniversityDto) {
    return this._universitiesRepository.update(id, updateUniversityDto);
  }

  remove(id: number) {
    return this._universitiesRepository.deleteById(id);
  }
}

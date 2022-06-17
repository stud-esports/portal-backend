import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { University } from './entities/university.entity';
import { UniversitiesRepository } from './universities.repository';

@Injectable()
export class UniversitiesService {
  constructor(
    private _universitiesRepository: UniversitiesRepository,
    @InjectModel(University) private _universityRepository: typeof University,
  ) {}

  create(createUniversityDto: CreateUniversityDto) {
    return this._universitiesRepository.create(createUniversityDto);
  }

  findAll() {
    return this._universitiesRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} university`;
  }

  update(id: number, updateUniversityDto: UpdateUniversityDto) {
    return this._universitiesRepository.update(id, updateUniversityDto);
  }

  remove(id: number) {
    return this._universitiesRepository.deleteById(id);
  }
}

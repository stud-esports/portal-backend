import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Team } from '../teams/entities/team.entity';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { University } from './entities/university.entity';

@Injectable()
export class UniversitiesRepository {
  constructor(@InjectModel(University) private university: typeof University) {}

  public async findAll(): Promise<University[] | null> {
    return this.university.scope(['defaultScope']).findAll();
  }

  public async create(createUniversityDto: CreateUniversityDto) {
    return this.university.create({ ...createUniversityDto });
  }

  public async findOne(id: number) {
    return this.university
      .scope(['defaultScope'])
      .findOne({ where: { _id: id } });
  }

  public async deleteById(id: number): Promise<number | null> {
    // const uni = await this.findOne(id);
    // this.university.findOne({
    //   where: { _id: id },
    //   include: [
    //     {
    //       model: Team,
    //       as: 'team',
    //     },
    //   ],
    // });
    // console.log(uni);
    // return null;
    return this.university.destroy({ where: { _id: id } });
  }

  public async update(
    id: number,
    dto: UpdateUniversityDto,
  ): Promise<[affectedCount: number]> {
    return this.university.update(dto, { where: { _id: id } });
  }
}

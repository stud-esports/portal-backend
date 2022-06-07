import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { University } from './entities/university.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Post()
  create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universitiesService.create(createUniversityDto);
  }

  @ApiOperation({ summary: 'Получить все университеты' })
  @ApiResponse({ status: 201, type: [University] })
  @Get()
  findAll() {
    return this.universitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.universitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUniversityDto: UpdateUniversityDto,
  ) {
    return this.universitiesService.update(+id, updateUniversityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universitiesService.remove(+id);
  }
}

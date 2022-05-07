import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public-url.decorator';
import { Team } from './entities/team.entity';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @ApiOperation({ summary: 'Создание команды' })
  @ApiResponse({ status: 200, type: Team })
  @Public()
  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @ApiOperation({ summary: 'Получить все команды' })
  @ApiResponse({ status: 201, type: [Team] })
  @Public()
  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.teamsService.findOne(+id);
  // }

  @ApiOperation({ summary: 'Изменение команды' })
  @ApiResponse({ status: 200, type: [Number] })
  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @ApiOperation({ summary: 'Удаление команды' })
  @ApiResponse({ status: 200, type: Number })
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}

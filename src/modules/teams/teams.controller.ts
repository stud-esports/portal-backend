import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Team } from './entities/team.entity';
import { defaultRoles } from 'src/enums/defaultRoles.enum';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Создание команды' })
  @ApiResponse({ status: 200, type: Team })
  @ApiBearerAuth()
  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @ApiOperation({ summary: 'Получить все команды' })
  @ApiResponse({ status: 201, type: [Team] })
  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.teamsService.findOne(+id);
  // }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Изменение команды' })
  @ApiResponse({ status: 200, type: [Number] })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Удаление команды' })
  @ApiResponse({ status: 200, type: Number })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}

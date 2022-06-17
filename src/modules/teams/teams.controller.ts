import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Team } from './entities/team.entity';
import { defaultRoles } from 'src/enums/defaultRoles.enum';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { User } from '../user/entities/user.entity';

interface CreateTeamMember {
  user_id: number;
  team_id: number;
}

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
  @ApiBearerAuth()
  @Get()
  findAll(
    @CurrentUser() user: User,
    @Query() filters?: { university_id: string },
  ) {
    if (filters?.university_id !== 'undefined') {
      return this.teamsService.findAll(user, filters);
    } else {
      return this.teamsService.findAll(user);
    }
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

  @ApiOperation({ summary: 'Записать пользователя в команду' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Post('/add-user-to-team')
  setTeamMember(@Body() createTeamMember: CreateTeamMember) {
    return this.teamsService.setTeamMember(createTeamMember);
  }

  @ApiOperation({ summary: 'Удалить пользователя из команды' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Post('/delete-user-from-team')
  deleteTeamMember(@Body() createTeamMember: CreateTeamMember) {
    return this.teamsService.deleteTeamMember(createTeamMember);
  }
}

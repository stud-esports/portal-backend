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
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { defaultRoles } from '../../enums/defaultRoles.enum';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User } from '../user/entities/user.entity';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Получение заявок на вступление в команду' })
  @ApiResponse({ status: 200, type: Number })
  @ApiBearerAuth()
  @Get()
  findAll(
    @CurrentUser() user: User,
    @Query()
    filters: {
      user_id: string;
      team_type: string;
      university_id: string;
    },
  ) {
    return this.applicationsService.findAll(user, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(+id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(+id);
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Принятие заявки на вступление в команду' })
  @ApiResponse({ status: 200, type: Number })
  @ApiBearerAuth()
  @Patch(':id/approve-application')
  approveApplication(
    @Param('id') id: string,
    @Body()
    approveApplicationDto: {
      user_id: string;
      team_id: string;
      commentary: string;
    },
  ) {
    return this.applicationsService.approveApplication(
      +id,
      approveApplicationDto,
    );
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Отклонение заявки на вступление в команду' })
  @ApiResponse({ status: 200, type: Number })
  @ApiBearerAuth()
  @Patch(':id/decline-application')
  declineApplication(
    @Param('id') id: string,
    @Body()
    declineApplicationDto: {
      user_id: string;
      team_id: string;
      commentary: string;
    },
  ) {
    return this.applicationsService.declineApplication(
      +id,
      declineApplicationDto,
    );
  }
}

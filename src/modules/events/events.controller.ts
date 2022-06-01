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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EventModel } from './entities/event.entity';
import { defaultRoles } from 'src/enums/defaultRoles.enum';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Создание события' })
  @ApiResponse({ status: 200, type: EventModel })
  @ApiBearerAuth()
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @ApiOperation({ summary: 'Получить все события' })
  @ApiResponse({ status: 201, type: [EventModel] })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Изменение события' })
  @ApiResponse({ status: 200, type: [Number] })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Удаление события' })
  @ApiResponse({ status: 200, type: Number })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventsService.remove(+id);
  }
}

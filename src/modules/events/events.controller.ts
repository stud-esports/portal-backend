import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public-url.decorator';
import { EventModel } from './entities/event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: 'Создание события' })
  @ApiResponse({ status: 200, type: EventModel })
  @Public()
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @ApiOperation({ summary: 'Получить все события' })
  @ApiResponse({ status: 201, type: [EventModel] })
  @Public()
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @ApiOperation({ summary: 'Изменение события' })
  @ApiResponse({ status: 200, type: [Number] })
  @Public()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @ApiOperation({ summary: 'Удаление события' })
  @ApiResponse({ status: 200, type: Number })
  @Public()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventsService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Public } from '../auth/decorators/public-url.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Game } from './entities/game.entity';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({ summary: 'Создание дисциплины (игры)' })
  @ApiResponse({ status: 200, type: Game })
  @Public()
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @ApiOperation({ summary: 'Получить все дисциплины (игры)' })
  @ApiResponse({ status: 201, type: [Game] })
  @Public()
  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @ApiOperation({ summary: 'Изменение дисциплины (игры)' })
  @ApiResponse({ status: 200, type: [Number] })
  @Public()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @ApiOperation({ summary: 'Удаление дисциплины (игры)' })
  @ApiResponse({ status: 200, type: Number })
  @Public()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.gamesService.remove(+id);
  }

  @ApiOperation({ summary: 'Найти дисциплину (игру) по названию (substring)' })
  @ApiResponse({ status: 200, type: [Game] })
  @Public()
  @Get('/search')
  async getUsersByKeyword(@Query() text: { text: string }) {
    return await this.gamesService.getGamesByKeyword(text);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Game } from './entities/game.entity';
import { defaultRoles } from '../../enums/defaultRoles.enum';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Создание дисциплины (игры)' })
  @ApiResponse({ status: 200, type: Game })
  @ApiBearerAuth()
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @ApiOperation({ summary: 'Получить все дисциплины (игры)' })
  @ApiResponse({ status: 201, type: [Game] })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Изменение дисциплины (игры)' })
  @ApiResponse({ status: 200, type: [Number] })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Удаление дисциплины (игры)' })
  @ApiResponse({ status: 200, type: Number })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.gamesService.remove(+id);
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Найти дисциплину (игру) по названию (substring)' })
  @ApiResponse({ status: 200, type: [Game] })
  @ApiBearerAuth()
  @Get('/search')
  async getUsersByKeyword(@Query() text: { text: string }) {
    return await this.gamesService.getGamesByKeyword(text);
  }
}

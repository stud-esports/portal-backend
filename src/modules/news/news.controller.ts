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
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { defaultRoles } from 'src/enums/defaultRoles.enum';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { User } from '../user/models/user.model';

@ApiTags('Новости')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Создать новость' })
  @ApiBearerAuth()
  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @ApiOperation({ summary: 'Получить все новости' })
  @ApiResponse({ status: 201 })
  @Get()
  findAll(
    @CurrentUser() user: User,
    @Query() filters?: { university_id: string },
  ) {
    if (filters?.university_id !== 'undefined') {
      return this.newsService.findAll(user, filters);
    } else {
      return this.newsService.findAll(user);
    }
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Найти новость по id' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Получить все новости' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    console.log('updateNewsDto', updateNewsDto);
    return this.newsService.update(+id, updateNewsDto);
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Удалить новость' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}

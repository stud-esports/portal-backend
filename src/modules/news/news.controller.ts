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
import { User } from '../user/entities/user.entity';
import { Public } from '../auth/decorators/public-url.decorator';

@ApiTags('Новости')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Создать новость' })
  @ApiBearerAuth()
  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createNewsDto: CreateNewsDto,
  ) {
    return await this.newsService.create({
      ...createNewsDto,
      user_id: user._id,
    });
  }

  @ApiOperation({ summary: 'Получить все новости' })
  @ApiResponse({ status: 201 })
  @Public()
  @Get()
  async findAll(
    @CurrentUser() user?: User,
    @Query() filters?: { university_id: string },
  ) {
    console.log({ user });
    if (filters?.university_id !== 'undefined') {
      return await this.newsService.findAll(user, filters);
    } else {
      return await this.newsService.findAll(user);
    }
  }

  @ApiOperation({ summary: 'Найти новость по id' })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Изменить данные новости' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @CurrentUser() user?: User,
  ) {
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

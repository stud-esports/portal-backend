import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public-url.decorator';

@ApiTags('Новости')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: 'Создать новость' })
  @Public()
  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @ApiOperation({ summary: 'Получить все новости' })
  @ApiResponse({ status: 201 })
  @Public()
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @ApiOperation({ summary: 'Найти новость по id' })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Получить все новости' })
  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    console.log('updateNewsDto', updateNewsDto);
    return this.newsService.update(+id, updateNewsDto);
  }

  @ApiOperation({ summary: 'Удалить новость' })
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}

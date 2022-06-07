import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsRepository } from './news.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { News } from './entities/news.entity';
import { User } from '../user/models/user.model';

@Module({
  controllers: [NewsController],
  providers: [NewsRepository, NewsService],
  exports: [NewsService],
  imports: [SequelizeModule.forFeature([News, User])],
})
export class NewsModule {}

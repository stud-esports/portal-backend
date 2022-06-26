import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsRepository } from './news.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { News } from './entities/news.entity';
import { User } from '../user/entities/user.entity';
import { EmailModule } from '../email/email.module';

@Module({
  controllers: [NewsController],
  providers: [NewsRepository, NewsService],
  exports: [NewsService],
  imports: [SequelizeModule.forFeature([News, User]), EmailModule],
})
export class NewsModule {}

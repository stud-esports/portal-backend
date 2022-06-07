import { Injectable } from '@nestjs/common';
import { User } from '../user/models/user.model';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsRepository } from './news.repository';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  create(createNewsDto: CreateNewsDto) {
    return this.newsRepository.create(createNewsDto);
  }

  findAll(user: User, filters?: { university_id: string }) {
    return this.newsRepository.findAll(user, filters);
  }

  findOne(id: number) {
    return this.newsRepository.findById(id);
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return this.newsRepository.update(id, updateNewsDto);
  }

  remove(id: number) {
    return this.newsRepository.deleteById(id);
  }
}

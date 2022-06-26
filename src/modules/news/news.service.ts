import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { User } from '../user/entities/user.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsRepository } from './news.repository';

@Injectable()
export class NewsService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly emailService: EmailService, // private readonly emailService: EmailService,
  ) {}

  create(createNewsDto: CreateNewsDto) {
    return this.newsRepository.create(createNewsDto);
  }

  async findAll(user?: User, filters?: { university_id: string }) {
    // await this.emailService.sendEmail();
    return await this.newsRepository.findAll(user, filters, [
      'withUser',
      'withUniversity',
    ]);
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

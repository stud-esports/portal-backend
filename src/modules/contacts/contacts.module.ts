import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { Contact } from './entities/contact.entity';
import { ContactsRepository } from './contacts.repository';
import { User } from '../user/entities/user.entity';
import { University } from '../universities/entities/university.entity';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, ContactsRepository],
  exports: [ContactsService],
  imports: [SequelizeModule.forFeature([Contact, User, University])],
})
export class ContactsModule {}

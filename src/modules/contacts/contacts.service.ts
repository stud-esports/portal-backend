import { Injectable } from '@nestjs/common';
import { User } from '../user/models/user.model';
import { ContactsRepository } from './contacts.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly contactsRepository: ContactsRepository) {}

  create(createContactDto: CreateContactDto) {
    return this.contactsRepository.create(createContactDto);
  }

  findAll(user: User, filters?: { university_id: string }) {
    return this.contactsRepository.findAll(user, filters);
  }

  findOneByUser(id: number) {
    return this.contactsRepository.findOneByUser(id);
  }

  findOne(id: number) {
    return this.contactsRepository.findOne(id);
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return this.contactsRepository.update(id, updateContactDto);
  }

  remove(id: number) {
    return this.contactsRepository.remove(id);
  }
}

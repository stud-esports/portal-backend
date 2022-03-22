import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/models/user.model';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsRepository {
  constructor(@InjectModel(Contact) private contacts: typeof Contact) {}

  public async create(createContactDto: CreateContactDto) {
    return this.contacts.create({ ...createContactDto });
  }

  public async findAll() {
    return this.contacts.findAll({
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });
  }

  public async findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  public async update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}

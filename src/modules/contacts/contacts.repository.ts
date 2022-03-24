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
    return this.contacts.findOne({
      where: { _id: id },
    });
  }

  public async findOneByUser(id: number) {
    return this.contacts.findOne({
      where: { user_id: id },
    });
  }

  public async update(id: number, updateContactDto: UpdateContactDto) {
    return this.contacts.update(updateContactDto, { where: { _id: id } });
  }

  public async remove(id: number) {
    return this.contacts.destroy({ where: { _id: id } });
  }
}

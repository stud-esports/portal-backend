import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { University } from '../universities/entities/university.entity';
import { User } from '../user/models/user.model';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsRepository {
  constructor(
    @InjectModel(Contact) private contacts: typeof Contact,
    @InjectModel(User) private _userRepository: typeof User,
  ) {}

  public async create(createContactDto: CreateContactDto) {
    return this.contacts.create({ ...createContactDto });
  }

  public async findAll(
    user: User,
    filters?: {
      university_id: string;
    },
  ): Promise<Contact[] | null> {
    const curUserRoles = await this._userRepository
      .scope(['withRole'])
      .findOne({
        where: { _id: user._id },
      });
    const roles = [
      curUserRoles?.roles[0]?.getDataValue('name'),
      curUserRoles?.roles[1]?.getDataValue('name'),
      curUserRoles?.roles[2]?.getDataValue('name'),
    ];

    if (filters.university_id) {
      return this.contacts.findAll({
        where: { contact_university_id: +filters.university_id },
        include: [
          {
            model: User,
            as: 'user',
          },
          {
            model: University,
            as: 'university',
          },
        ],
      });
    } else if (roles.includes('moderator')) {
      return this.contacts.findAll({
        where: { contact_university_id: null },
        include: [
          {
            model: User,
            as: 'user',
          },
          {
            model: University,
            as: 'university',
          },
        ],
      });
    } else {
      console.log('HI');
      return this.contacts.findAll({
        include: [
          {
            model: User,
            as: 'user',
          },
          {
            model: University,
            as: 'university',
          },
        ],
      });
    }
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

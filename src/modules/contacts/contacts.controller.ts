import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../auth/decorators/public-url.decorator';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@ApiTags('К кому обратиться')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly _contactsService: ContactsService) {}

  @ApiOperation({ summary: 'Создание контакта' })
  @ApiResponse({ status: 200, type: Contact })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Контакт с этим пользователем уже существует',
  })
  @Public()
  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    const contact = await this._contactsService.findOneByUser(
      createContactDto.user_id,
    );
    if (contact) {
      throw new BadRequestException({
        status: 400,
        error: 'Контакт с этим пользователем уже существует',
      });
    }
    return this._contactsService.create(createContactDto);
  }

  @ApiOperation({ summary: 'Получение всех контактов' })
  @ApiResponse({ status: 200, type: [Contact] })
  @Public()
  @Get()
  findAll() {
    return this._contactsService.findAll();
  }

  @ApiOperation({ summary: 'Получение одного контакта по id' })
  @ApiResponse({ status: 200, type: Contact })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this._contactsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Изменение контакта' })
  @ApiResponse({ status: 200, type: [Number] })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Контакт с этим пользователем уже существует',
  })
  @Public()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    if (updateContactDto.user_id !== id) {
      const contact = await this._contactsService.findOneByUser(
        updateContactDto.user_id,
      );
      if (contact) {
        throw new BadRequestException({
          status: 400,
          error: 'Контакт с этим пользователем уже существует',
        });
      }
    }
    return this._contactsService.update(+id, updateContactDto);
  }

  @ApiOperation({ summary: 'Удаление контакта' })
  @ApiResponse({ status: 200, type: Number })
  @Public()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this._contactsService.remove(+id);
  }
}

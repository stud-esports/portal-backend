import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { defaultRoles } from 'src/enums/defaultRoles.enum';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User } from '../user/entities/user.entity';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@ApiTags('К кому обратиться')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly _contactsService: ContactsService) {}

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Создание контакта' })
  @ApiResponse({ status: 200, type: Contact })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Контакт с этим пользователем уже существует',
  })
  @ApiBearerAuth()
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

  @ApiOperation({ summary: 'Получить всех контактов' })
  @ApiResponse({ status: 201, type: [Contact] })
  @ApiBearerAuth()
  @Get()
  findAll(
    @CurrentUser() user: User,
    @Query() filters?: { university_id: string },
  ) {
    if (filters?.university_id !== 'undefined') {
      return this._contactsService.findAll(user, filters);
    } else {
      return this._contactsService.findAll(user);
    }
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Получение одного контакта по id' })
  @ApiResponse({ status: 200, type: Contact })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this._contactsService.findOne(+id);
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Изменение контакта' })
  @ApiResponse({ status: 200, type: [Number] })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Контакт с этим пользователем уже существует',
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateContactDto: UpdateContactDto) {
    return this._contactsService.update(+id, updateContactDto);
  }

  @Roles(defaultRoles.ADMIN, defaultRoles.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Удаление контакта' })
  @ApiResponse({ status: 200, type: Number })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this._contactsService.remove(+id);
  }
}

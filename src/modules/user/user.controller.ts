import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// МОДЕЛИ БД
import { User } from './entities/user.entity';

// GUARDS
import { RolesGuard } from '../auth/guards/roles.guard';

// ДЕКОРАТОРЫ
import { Roles } from '../auth/decorators/roles-auth.decorator';

// СЕРВИСЫ
import { UsersService } from './user.service';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateUserDto } from './dto/update-info.dto';
import { CheckEmailDto, CheckLoginDto, CheckPhoneDto } from './dto/checks.dto';

// PARAMS
import { AddRoleParams } from './params/add-role.params';
import { UpdateInfoParams } from './params/update-info.params';
import { RemoveUserParams } from './params/remove-user.params';
import { RemoveRolesParams } from './params/remove-roles.params';
import { GetByIdParams } from './params/get-by-id.params';
import { Public } from '../auth/decorators/public-url.decorator';

// ENUMS
import { defaultRoles } from 'src/enums/defaultRoles.enum';
import { CurrentUser } from '../auth/decorators/user.decorator';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Найти пользователей по ФИО (substring)' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiQuery({ name: 'text' })
  @Public()
  @Get('/search')
  async getUsersByKeyword(@Query() param: { text: string }) {
    return await this.usersService.getUsersByKeyword(param);
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: User })
  @ApiBearerAuth()
  @Roles(defaultRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return await this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Проверить существование почты' })
  @ApiResponse({ status: 200, type: Boolean })
  @Public()
  @Get('/check-email')
  async checkEmail(@Query() dto: CheckEmailDto) {
    return await this.usersService.isEmailAlreadyUsed(dto.email);
  }

  @ApiOperation({ summary: 'Проверить существование логина' })
  @ApiResponse({ status: 200, type: Boolean })
  @Public()
  @Get('/check-login')
  async checkLogin(@Query() dto: CheckLoginDto) {
    return await this.usersService.isEmailAlreadyUsed(dto.login);
  }

  @ApiOperation({ summary: 'Проверить существование номера' })
  @ApiResponse({ status: 200, type: Boolean })
  @Public()
  @Get('/check-phone')
  async checkPhone(@Query() dto: CheckPhoneDto) {
    return await this.usersService.isEmailAlreadyUsed(dto.phone);
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBearerAuth()
  @Roles(defaultRoles.USER)
  @UseGuards(RolesGuard)
  @Get('get-all')
  async getAll() {
    return await this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получить всех пользователей (админ)' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBearerAuth()
  @Roles(defaultRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Get('get-all-by-admin')
  async getAllByAdmin() {
    return await this.usersService.getAllUsers(true);
  }

  @ApiOperation({ summary: 'Получить данные пользователя по токену' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  @Get('/by-token')
  async getUserInfo(@CurrentUser() user: User) {
    return user;
  }

  @ApiOperation({ summary: 'Получить данные пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  @Roles(defaultRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Get(':userId')
  async getById(@Param() params: GetByIdParams) {
    return await this.usersService.getUserById(params.userId);
  }

  @ApiOperation({ summary: 'Изменение пользователя' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  @Put('/:userId')
  async updateInfo(
    @Param() params: UpdateInfoParams,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUserData(params.userId, updateUserDto);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiBearerAuth()
  @Roles(defaultRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/:userId')
  async removeUser(@Param() params: RemoveUserParams) {
    return await this.usersService.removeUser(params.userId);
  }

  @ApiOperation({ summary: 'Выдать роль пользователю' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(defaultRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Post('/:userId/add-role')
  async addRole(@Param() params: AddRoleParams, @Body() dto: AddRoleDto) {
    return await this.usersService.addRole(params.userId, dto);
  }

  @ApiOperation({ summary: 'Удалить роли у пользователя' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(defaultRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/:userId/remove-roles')
  async removeRoles(
    @Param() params: RemoveRolesParams,
    @Body(new ParseArrayPipe({ items: String }))
    dto: string[],
  ) {
    return await this.usersService.removeRoles(params.userId, dto);
  }

  @Roles(defaultRoles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Блокировка/разблокировка пользователя' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  // @ApiBearerAuth()
  @Patch('block/:userId')
  async blockUser(
    @Param() params: UpdateInfoParams,
    @Body()
    blockInfo: {
      banned_from_date: string;
      banned_to_date: string;
      block_reason: string;
    },
  ) {
    return await this.usersService.blockUser(params.userId, blockInfo);
  }

  @Roles(defaultRoles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Изменение прав пользователей' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  // @ApiBearerAuth()
  @Patch('/:userId/update-roles')
  async updateUserRoles(
    @Param() params: UpdateInfoParams,
    @Body()
    roles: { newRoles: { name: string }[]; oldRoles: { name: string }[] },
  ) {
    return await this.usersService.updateRoles(params.userId, roles);
  }
}

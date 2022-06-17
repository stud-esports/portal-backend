import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateUserDto } from './dto/update-info.dto';

// СЕРВИСЫ
import { RolesService } from '../role/role.service';

// ENUMS
import { defaultRoles } from 'src/enums/defaultRoles.enum';

// РЕПОЗИТОРИЙ
import { UsersRepository } from './user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private roleService: RolesService,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async validateCredentials(
    password: string,
    user: User,
  ): Promise<boolean> {
    return await compare(password, user.password);
  }

  public checkIsAdmin(user: User): boolean {
    return user.roles.some(
      (role) => role.name === 'admin' || role.name === 'moderator',
    );
  }

  // СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ
  async createUser(dto: CreateUserDto) {
    const candidateEmail = await this.isEmailAlreadyUsed(dto.email);
    const candidatePhone = await this.isPhoneAlreadyUsed(dto.phone);
    const candidateLogin = await this.isLoginAlreadyUsed(dto.login);
    if (candidateEmail || candidatePhone || candidateLogin) {
      throw new HttpException(
        'Пользователь с таким email, номером или логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersRepository.create(dto);
    await this.roleService.setRoleToUser(user._id, defaultRoles.USER);
    return await this.usersRepository.findById(user._id);
  }

  // ОБНОВИТЬ ПОЛЯ ПОЛЬЗОВАТЕЛЯ
  async updateUserData(id: number, dto: UpdateUserDto) {
    return await this.usersRepository.update(id, dto);
  }

  // ПРОВЕРИТЬ, СУЩЕСТВУЕТ ЛИ УЖЕ ПОЧТА
  async isEmailAlreadyUsed(email: string): Promise<boolean> {
    const candidate = await this.usersRepository.findByEmail(email);
    return candidate !== null;
  }

  // ПРОВЕРИТЬ, СУЩЕСТВУЕТ ЛИ УЖЕ НОМЕР
  async isPhoneAlreadyUsed(phone: string): Promise<boolean> {
    const candidate = await this.usersRepository.findByPhone(phone);
    return candidate !== null;
  }

  // ПРОВЕРИТЬ, СУЩЕСТВУЕТ ЛИ УЖЕ ЛОГИН
  async isLoginAlreadyUsed(login: string): Promise<boolean> {
    const candidate = await this.usersRepository.findByLogin(login);
    return candidate !== null;
  }

  // ПОЛУЧИТЬ СПИСОК ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
  async getAllUsers() {
    return await this.usersRepository.findAll();
  }

  // ПОЛУЧИТЬ СПИСОК ПОЛЬЗОВАТЕЛЕЙ ПО ФИО
  async getUsersByKeyword(param: { text: string }) {
    return await this.usersRepository.findByKeyword(param);
  }

  // УДАЛИТЬ ПОЛЬЗОВАТЕЛЕЯ
  async removeUser(id: number) {
    await this.roleService.removeAllRolesFromUser(id);
    return await this.usersRepository.deleteById(id);
  }

  // ПОЛУЧИТЬ ПОЛЬЗОВАТЕЛЯ ПО ПОЧТЕ
  async getUserByEmail(email: string, withPassword = false) {
    const user = await this.usersRepository.findByEmail(email, withPassword);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  // ПОЛУЧИТЬ ПОЛЬЗОВАТЕЛЯ ПО ID
  async getUserById(id: number, withPassword = false) {
    const user = await this.usersRepository.findById(id, withPassword);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  // ДОБАВИТЬ РОЛЬ ПОЛЬЗОВАТЕЛЮ
  async addRole(id: number, dto: AddRoleDto) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    await this.roleService.setRoleToUser(user._id, dto.value);
  }

  // УБРАТЬ РОЛИ У ПОЛЬЗОВАТЕЛЯ
  async removeRoles(id: number, rolesNames: string[]) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    await this.roleService.removeRolesFromUser(user._id, rolesNames);
  }

  // БЛОКИРОВАТЬ ПОЛЬЗОВАТЕЛЯ
  async blockUser(
    id: number,
    blockInfo: {
      banned_from_date: string;
      banned_to_date: string;
      block_reason: string;
    },
  ) {
    return await this.usersRepository.blockUser(id, blockInfo);
  }

  // ИЗМЕНИТЬ РОЛИ ПОЛЬЗОВАТЕЛЯ
  async updateRoles(id: number, roles: any) {
    const rolesToDelete = [];
    const rolesToAdd = [];

    roles.newRoles.forEach((newRole: { name: string }) => {
      if (
        !roles.oldRoles.some(
          (oldRole: { name: string }) => oldRole.name === newRole.name,
        )
      ) {
        rolesToAdd.push(newRole.name);
      }
    });

    roles.oldRoles.forEach((oldRole: { name: string }) => {
      if (
        !roles.newRoles.some(
          (newRole: { name: string }) => newRole.name === oldRole.name,
        )
      ) {
        rolesToDelete.push(oldRole.name);
      }
    });

    if (rolesToDelete.length) {
      await this.roleService.removeRolesFromUser(id, rolesToDelete);
    }
    rolesToAdd.forEach((roleToAdd) =>
      this.roleService.setRoleToUser(id, roleToAdd),
    );
  }
}

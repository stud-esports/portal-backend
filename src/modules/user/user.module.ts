import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// МОДЕЛИ БД
import { User } from './models/user.model';
import { Role } from '../role/models/role.model';
import { UserRoles } from '../role/models/user-role.model';

// МОДУЛИ
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';

// КОНТРОЛЛЕРЫ
import { UsersController } from './user.controller';

// СЕРВИСЫ
import { UsersService } from './user.service';

// РЕПОЗИТОРИИ
import { UsersRepository } from './user.repository';
import { Contact } from '../contacts/entities/contact.entity';
import { Team } from '../teams/entities/team.entity';
import { Application } from '../applications/entities/application.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Contact, Team, Application]),
    RoleModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UserModule {}

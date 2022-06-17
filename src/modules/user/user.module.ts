import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// МОДЕЛИ БД
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { UserRoles } from '../role/entities/user-role.entity';

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
import { University } from '../universities/entities/university.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      UserRoles,
      Contact,
      Team,
      Application,
      University,
    ]),
    RoleModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UserModule {}

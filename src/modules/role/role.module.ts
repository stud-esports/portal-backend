import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// СЕРВИСЫ
import { RolesService } from './role.service';

// КОНТРОЛЛЕРЫ
import { RolesController } from './role.controller';

// МОДЕЛИ БД
import { User } from '../user/entities/user.entity';
import { UserRoles } from './entities/user-role.entity';
import { Role } from './entities/role.entity';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RolesService],
})
export class RoleModule {}

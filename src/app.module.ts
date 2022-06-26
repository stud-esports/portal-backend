import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { APP_GUARD } from '@nestjs/core';
import * as path from 'path';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

// МОДУЛИ
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { GamesModule } from './modules/games/games.module';
import { EventsModule } from './modules/events/events.module';
import { TeamsModule } from './modules/teams/teams.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { NewsModule } from './modules/news/news.module';
import { FilesModule } from './modules/files/files.module';
import { UniversitiesModule } from './modules/universities/universities.module';
import { ApplicationsModule } from './modules/applications/applications.module';

// МОДЕЛИ БД
import { User } from './modules/user/entities/user.entity';
import { UserRoles } from './modules/role/entities/user-role.entity';
import { Role } from './modules/role/entities/role.entity';
import { RefreshToken } from './modules/auth/entities/refresh-token.entity';
import { News } from './modules/news/entities/news.entity';
import { Contact } from './modules/contacts/entities/contact.entity';
import { Game } from './modules/games/entities/game.entity';
import { Team } from './modules/teams/entities/team.entity';
import { TeamMember } from './modules/teams/entities/team_member.entity';
import { Application } from './modules/applications/entities/application.entity';
import { University } from './modules/universities/entities/university.entity';
import { File } from './modules/files/entities/file.entity';
import { Event } from './modules/events/entities/event.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: 'esportmoscowmail@gmail.com',
          pass: 'kM3qv6a0dZF8',
        },
      },
      defaults: {
        from: '"No-Replay" <esportmoscowmail@gmail.com>',
      },
      template: {
        dir: __dirname + '/mail/templates',
        // dir: '../mail/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UserRoles,
        RefreshToken,
        News,
        Contact,
        Game,
        Team,
        TeamMember,
        Application,
        University,
        File,
        Event,
      ],
      autoLoadModels: process.env.NODE_ENV === 'development',
      retryAttempts: 3,
      sync: { force: false },
    }),
    MulterModule.register({
      dest: './dist/static',
    }),
    UserModule,
    RoleModule,
    AuthModule,
    FilesModule,
    NewsModule,
    ContactsModule,
    GamesModule,
    EventsModule,
    TeamsModule,
    ApplicationsModule,
    UniversitiesModule,
  ],
})
export class AppModule {}

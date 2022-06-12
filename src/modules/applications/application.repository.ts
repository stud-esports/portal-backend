import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Team } from '../teams/entities/team.entity';
import { University } from '../universities/entities/university.entity';
import { User } from '../user/models/user.model';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectModel(Application) private application: typeof Application,
    @InjectModel(User) private _userRepository: typeof User,
  ) {}

  public async findAll(
    user: User,
    filters: {
      user_id: string;
      team_type: string;
      university_id: string;
    },
  ): Promise<Application[] | null> {
    const { user_id, team_type, university_id } = filters;
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
    let applications = [];
    if (university_id && university_id !== 'undefined') {
      applications = await this.application.findAll({
        where: { application_university_id: +filters.university_id },
        include: [
          {
            model: User,
            as: 'applicant',
          },
          {
            model: Team,
            as: 'team',
          },
          {
            model: University,
            as: 'application_university',
          },
        ],
        attributes: {
          exclude: ['applicant_id', 'team_id'],
        },
        order: [
          // [User, 'last_name', 'DESC'],
          ['createdAt', 'DESC'],
          ['is_archived', 'ASC'],
        ],
      });
      applications = applications.filter((a) => a.team.team_type === team_type);
      return applications;
    } else if (roles.includes('moderator')) {
      applications = await this.application.findAll({
        where: { application_university_id: null },
        include: [
          {
            model: User,
            as: 'applicant',
          },
          {
            model: Team,
            as: 'team',
          },
          {
            model: University,
            as: 'application_university',
          },
        ],
        attributes: {
          exclude: ['applicant_id', 'team_id'],
        },
        order: [
          // [User, 'last_name', 'DESC'],
          ['createdAt', 'DESC'],
          ['is_archived', 'ASC'],
        ],
      });

      applications = applications.filter((a) => a.team.team_type === team_type);
      return applications;
    } else {
      applications = await this.application.findAll({
        include: [
          {
            model: User,
            as: 'applicant',
          },
          {
            model: Team,
            as: 'team',
          },
          {
            model: University,
            as: 'application_university',
          },
        ],
        attributes: {
          exclude: ['applicant_id', 'team_id'],
        },
        order: [
          // [User, 'last_name', 'DESC'],
          ['createdAt', 'DESC'],
          ['is_archived', 'ASC'],
        ],
      });
      applications = applications.filter((a) => a.team.team_type === team_type);
      return applications;
    }
  }

  public async approveApplication(_id, user_id, team_id, commentary) {
    this.application.update(
      { user_id, team_id, commentary, is_archived: true, status: 'approved' },
      { where: { _id } },
    );
  }

  public async declineApplication(_id, user_id, team_id, commentary) {
    this.application.update(
      { user_id, team_id, commentary, is_archived: true, status: 'declined' },
      { where: { _id } },
    );
  }
}

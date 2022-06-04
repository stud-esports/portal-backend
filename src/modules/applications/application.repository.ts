import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Team } from '../teams/entities/team.entity';
import { User } from '../user/models/user.model';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectModel(Application) private application: typeof Application,
  ) {}

  public async findAll(filters: {
    user_id: string;
    team_type: string;
  }): Promise<Application[] | null> {
    const { user_id, team_type } = filters;
    let applications = await this.application.findAll({
      include: [
        {
          model: User,
          as: 'applicant',
        },
        {
          model: Team,
          as: 'team',
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

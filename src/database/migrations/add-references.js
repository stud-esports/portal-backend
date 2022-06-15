'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // users

    await queryInterface.addColumn('users', 'team_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'teams',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'university_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'universities',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'moderated_university_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'universities',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });

    //  refresh_tokens

    await queryInterface.addColumn('refresh_tokens', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'users',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });

    //  news

    await queryInterface.addColumn('news', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'users',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
    await queryInterface.addColumn('news', 'university_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'universities',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });

    //  users_roles

    await queryInterface.addColumn('users_roles', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'users',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
    await queryInterface.addColumn('users_roles', 'role_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'roles',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });

    //  contacts

    await queryInterface.addColumn('contacts', 'university_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'universities',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
    await queryInterface.addColumn('contacts', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'users',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });

    //  teams

    await queryInterface.addColumn('teams', 'university_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'universities',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
    await queryInterface.addColumn('teams', 'game_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'games',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
    await queryInterface.addColumn('teams', 'captain_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'users',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });

    //  team_members

    await queryInterface.addColumn('team_members', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'users',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
    await queryInterface.addColumn('team_members', 'team_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'teams',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });

    //  applications

    await queryInterface.addColumn('applications', 'applicant_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'users',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    });
    await queryInterface.addColumn('applications', 'team_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'teams',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
    await queryInterface.addColumn('applications', 'university_id', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'universities',
        },
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },
};

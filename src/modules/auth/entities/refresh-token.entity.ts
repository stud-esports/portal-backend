import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

// МОДЕЛИ БД
import { User } from '../../user/entities/user.entity';

interface RefreshTokenCreationAttrs {
  expires: Date;
  user_id: number;
  token: string;
  fingerprint: string;
}

interface RefreshTokenAttrs {
  _id: number;
  token: string;
  is_revoked: boolean;
  fingerprint: string;
  expires: Date;
  user_id: number;
}

@Table({ tableName: 'refresh_tokens', createdAt: false, updatedAt: false })
export class RefreshToken extends Model<
  RefreshTokenAttrs,
  RefreshTokenCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'Уникальный id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  _id: number;

  @ApiProperty({
    example: 1,
    description: 'Можно ли отозвать токен',
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  is_revoked: boolean;

  @ApiProperty({
    example: 'asdajasdahh12h31hb1j1kh',
    description: 'Refresh Токен',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token: string;

  @ApiProperty({
    example: 'asdajasdahh12h31hb1j1kh',
    description: 'Отпечаток устройства',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fingerprint: string;

  @ApiProperty({
    example: '2021-05-12T06:57:24.059Z',
    description: 'Время жизни токена',
  })
  @Column({
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  })
  expires: Date;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  // Sequelize Relations

  @BelongsTo(() => User, 'user_id')
  user: User;
}

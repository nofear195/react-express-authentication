import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  Default,
} from 'sequelize-typescript';

@Table({
  tableName: 'users', // Specify your custom table name
  timestamps: true, // Enable timestamps
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  name!: string;

  @Column
  picture!: string;

  @AllowNull(false)
  @Column
  email!: string;

  @Column
  password!: string;

  @AllowNull(false)
  @Default(false)
  @Column({
    field: 'is_verified',
  })
  isVerified!: boolean;

  @Column
  verificationString!: string;

  @CreatedAt
  @Column({
    field: 'created_at',
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
  })
  updatedAt!: Date;
}

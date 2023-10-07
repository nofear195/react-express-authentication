import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, AllowNull } from "sequelize-typescript";


@Table({
    tableName: 'users', // Specify your custom table name
    timestamps: true, // Enable timestamps
})

export class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    email!: string;

    @AllowNull(false)
    @Column
    password!: string;

    @AllowNull(false)
    @Column({
        field: 'is_verified',
    })
    
    isVerified: boolean = false;

    @CreatedAt
    @AllowNull(false)
    @Column({
        field: 'created_at'
    })
    createdAt!: Date;

    @UpdatedAt
    @AllowNull(false)
    @Column({
        field: 'updated_at'
    })
    updatedAt!: Date;

}

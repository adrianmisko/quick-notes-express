import { Column, CreatedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import Note from "./Note";

@Table
class User extends Model {

    @PrimaryKey
    @Column
    public email!: string;

    @Column
    public name!: string;

    @HasMany(() => Note)
    public notes!: Note[];

    @CreatedAt
    @Column
    public createdAt!: Date;

    @UpdatedAt
    @Column
    public updatedAt!: Date;

    @Column
    private passwordHash!: string;

}

export default User;

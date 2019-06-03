import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import User from "./User";

@Table
class Note extends Model<Note> {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id!: number;

    @ForeignKey(() => User)
    @Column
    public userEmail!: string;

    @BelongsTo(() => User)
    public owner!: User;

    @Column
    public title!: string;

    @Column
    public content!: string;

    @CreatedAt
    @Column
    public createdAt!: Date;

    @UpdatedAt
    @Column
    public updatedAt!: Date;

}

export default Note;

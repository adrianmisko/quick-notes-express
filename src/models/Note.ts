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
import { DefaultScope } from "sequelize-typescript/dist/scopes";
import User from "./User";

@Table
@DefaultScope({
    attributes: ["id", "title", "content", "createdAt", "updatedAt"]
})
class Note extends Model<Note> {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id!: number;

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

    @ForeignKey(() => User)
    @Column
    public userEmail!: string;

}

export default Note;

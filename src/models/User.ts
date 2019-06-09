import * as bcrypt from "bcryptjs";
import {
    BeforeCreate,
    Column,
    CreatedAt,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import {DefaultScope, Scopes} from "sequelize-typescript/dist/scopes";
import Note from "./Note";

@Table
@DefaultScope({
    attributes: ["email", "name", "createdAt", "updatedAt", "passwordHash"]
})
@Scopes({
    withNotes: {
        attributes: ["email", "name", "createdAt", "updatedAt"],
        include: [() => Note],
    },
    json: {
        attributes: ["email", "name", "createdAt", "updatedAt"]
    }
})
class User extends Model {

    @BeforeCreate
    public static async generatePasswordHash(instance: User) {
        instance.passwordHash = await bcrypt.hash(instance.passwordHash, 10);
    }

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
    public passwordHash!: string;

    public async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.passwordHash);
    }
}

export default User;

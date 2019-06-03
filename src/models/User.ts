import * as bcrypt from "bcryptjs";
import {
    BeforeCreate, BeforeUpdate,
    Column,
    CreatedAt,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import Note from "./Note";

@Table
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
    private passwordHash!: string;

    public async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.passwordHash);
    }
}

export default User;

import {MigrationInterface, QueryRunner} from "typeorm";
import { Users } from "../entities/Users";
import usersDummyData from "./dummyData/users";

export class AddUsers1650455329142 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.getMongoRepository(Users).insertMany(usersDummyData);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.getMongoRepository(Users).delete({firstName: 'fake'})
    }

}

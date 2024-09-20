import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1726792864322 implements MigrationInterface {
    name = 'InitialMigration1726792864322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "sentTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "senderId" integer, "receiverId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_acf951a58e3b9611dd96ce89042" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_acf951a58e3b9611dd96ce89042"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}

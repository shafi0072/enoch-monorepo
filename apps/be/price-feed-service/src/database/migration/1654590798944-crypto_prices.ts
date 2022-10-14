import {MigrationInterface, QueryRunner} from "typeorm";

export class cryptoPrices1654590798944 implements MigrationInterface {
    name = 'cryptoPrices1654590798944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bitcoin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crypto" character varying(255) NOT NULL, "fiat" character varying(255) NOT NULL, "medianized_price" double precision NOT NULL, "sources" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_08d530b292231106a2fb4ea0985" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dai" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crypto" character varying(255) NOT NULL, "fiat" character varying(255) NOT NULL, "medianized_price" double precision NOT NULL, "sources" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fa87b25c287a0ebf29023b28793" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ethereum" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crypto" character varying(255) NOT NULL, "fiat" character varying(255) NOT NULL, "medianized_price" double precision NOT NULL, "sources" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cd89c585c4ebc506a946c53291f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "matic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crypto" character varying(255) NOT NULL, "fiat" character varying(255) NOT NULL, "medianized_price" double precision NOT NULL, "sources" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_34c9fcea9b89067e90e2182ad82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crypto" character varying(255) NOT NULL, "fiat" character varying(255) NOT NULL, "medianized_price" double precision NOT NULL, "sources" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2e40b9e4e631a53cd514d82ccd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tether" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crypto" character varying(255) NOT NULL, "fiat" character varying(255) NOT NULL, "medianized_price" double precision NOT NULL, "sources" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3e0f1f7814dcad07cdf1b215a7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usd_coin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crypto" character varying(255) NOT NULL, "fiat" character varying(255) NOT NULL, "medianized_price" double precision NOT NULL, "sources" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e8dcd479f6dd5fb967456f11dc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wbitcoin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crypto" character varying(255) NOT NULL, "fiat" character varying(255) NOT NULL, "medianized_price" double precision NOT NULL, "sources" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_190342e9b1d715e2f35b331cffd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wmatic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crypto" character varying(255) NOT NULL, "fiat" character varying(255) NOT NULL, "medianized_price" double precision NOT NULL, "sources" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3bb48dd976a946e06bdcfe846ff" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "wmatic"`);
        await queryRunner.query(`DROP TABLE "wbitcoin"`);
        await queryRunner.query(`DROP TABLE "usd_coin"`);
        await queryRunner.query(`DROP TABLE "tether"`);
        await queryRunner.query(`DROP TABLE "prices"`);
        await queryRunner.query(`DROP TABLE "matic"`);
        await queryRunner.query(`DROP TABLE "ethereum"`);
        await queryRunner.query(`DROP TABLE "dai"`);
        await queryRunner.query(`DROP TABLE "bitcoin"`);
    }

}

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Discount1724333543473 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"Discounts",
            columns :[
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: "name",
                    type:"varchar",
                },
                {
                    name:"discountAmount",
                    type :"integer",
                },
                {
                    name:"discountType",
                    type :"enum",
                    enum:['%','fixed'],
                    default:`'%'`,
                },
                {
                    name: "startAt",
                    type:"datetime",
                    default:"now()"
                },
                {
                    name: "expire",
                    type:"datetime",
                },
                {
                    name: "adminId",
                    type:"integer",
                },
                {
                    name:"status",
                    type :"enum",
                    enum:['active','inactive'],
                    default:`'active'`,
                }
            ]
        }))
        await queryRunner.createForeignKey("Discounts",
            new TableForeignKey({
                columnNames:["adminId"],
                referencedColumnNames:["id"],
                referencedTableName :"users",
                onDelete:"CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Discounts")
    }

}

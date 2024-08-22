import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CategoryDiscount1724335332597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"categoryDiscounts",
            columns:[
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
                    name:'discountId',
                    type:'integer'
                },
                {
                    name:'categoryId',
                    type:'integer'
                }
            ]
        }))
        await queryRunner.createForeignKey("categoryDiscounts",
            new TableForeignKey({
                columnNames:["categoryId"],
                referencedColumnNames:["id"],
                referencedTableName :"categories",
                onDelete:"CASCADE"
            })
        )
        await queryRunner.createForeignKey("categoryDiscounts",
            new TableForeignKey({
                columnNames:["discountId"],
                referencedColumnNames:["id"],
                referencedTableName :"discounts",
                onDelete:"CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categoryDiscounts")
    }

}

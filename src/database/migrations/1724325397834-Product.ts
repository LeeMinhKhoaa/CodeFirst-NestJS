import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Product1724325397834 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"products",
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
                    name:"name",
                    type:"varchar",
                    isUnique:true
                },
                {
                    name :"description",
                    type :"text"
                },
                {
                    name :"quanlity",
                    type : "integer",
                    default : 1
                },
                {
                    name :"quanlitySold",
                    type : "integer", 
                },
                {
                    name :"price",
                    type : "integer",
                },
                {
                    name :"userId",
                    type : "integer",
                },
            ]
        }))
        await queryRunner.createForeignKey(
            "products",
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Product")
    }

}

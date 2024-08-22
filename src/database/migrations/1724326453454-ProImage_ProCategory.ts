import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ProImageProCategory1724326453454 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"productImages",
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
                    name: 'productId',
                    type: 'integer',
                },
                {
                    name: 'imgUrl',
                    type: 'varchar',
                }
            ]
        }))
        await queryRunner.createTable(new Table({
            name:"productCategories",
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
                    name: 'productId',
                    type: 'integer',
                },
                {
                    name: 'categoryId',
                    type: 'integer',
                }
            ]
        }))
        await queryRunner.createForeignKey(
            "productImages",
            new TableForeignKey({
                columnNames: ['productId'],
                referencedColumnNames :['id'],
                referencedTableName : 'products',
                onDelete : "CASCADE"
            })
        )
        await queryRunner.createForeignKey(
            "productCategories",
            new TableForeignKey({
                columnNames: ['productId'],
                referencedColumnNames :['id'],
                referencedTableName : 'products',
                onDelete : "CASCADE"
            })
        ) 
        await queryRunner.createForeignKey(
            "productCategories",
            new TableForeignKey({
                columnNames: ['categoryId'],
                referencedColumnNames :['id'],
                referencedTableName : 'categories',
                onDelete : "CASCADE"
            })
        ) 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("productImages")
        await queryRunner.dropTable("productCategories")
    }

}

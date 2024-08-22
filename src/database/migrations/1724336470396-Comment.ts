import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Comment1724336470396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"comments",
            columns:[
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'content',
                    type: 'text',
                },
                {
                    name: 'vote',
                    type: 'integer',
                },
                {
                    name:'userId',
                    type:'integer'
                },
                {
                    name:'productId',
                    type:'integer'
                },
                {
                    name:'parentId',
                    type:'integer'
                },
            ]
        }))
        await queryRunner.createForeignKey(
            "comments",
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames :['id'],
                referencedTableName : 'users',
                onDelete : "CASCADE"
            })
        ) 
        await queryRunner.createForeignKey(
            "comments",
            new TableForeignKey({
                columnNames: ['parentId'],
                referencedColumnNames :['id'],
                referencedTableName : 'comments',
                onDelete : "CASCADE"
            })
        ) 
        await queryRunner.createForeignKey(
            "comments",
            new TableForeignKey({
                columnNames: ['productId'],
                referencedColumnNames :['id'],
                referencedTableName : 'products',
                onDelete : "CASCADE"
            })
        ) 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

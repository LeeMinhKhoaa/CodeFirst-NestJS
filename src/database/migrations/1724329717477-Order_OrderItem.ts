import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class OrderOrderItem1724329717477 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"orders",
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
                    name: 'buyerName',
                    type: 'varchar',
                },
                {
                    name: 'buyerPhone',
                    type: 'varchar',
                },
                {
                    name: 'buyerEmail',
                    type: 'varchar',
                },
                {
                    name: 'buyerAddress',
                    type: 'varchar',
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['pending', 'confirm','cancel'],
                    default: `'pending'`,
                },
                {
                    name: 'userId',
                    type: 'integer',
                },
            ]
        }))
        await queryRunner.createTable(new Table({
            name:"orderItems",
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
                    name:"quanlity",
                    type :"integer",
                    default:1
                },
                {
                    name:"price",
                    type :"integer",
                },
                {
                    name:"discountId",
                    type :"integer",
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
                    name:"productId",
                    type:"integer",
                },
                {
                    name:"orderId",
                    type:"integer",
                }
            ]
        }))
        await queryRunner.createForeignKey(
            "orders",
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames :['id'],
                referencedTableName : 'users',
                onDelete : "CASCADE"
            })
        ) 
        await queryRunner.createForeignKey(
            "orderItems",
            new TableForeignKey({
                columnNames: ['productId'],
                referencedColumnNames :['id'],
                referencedTableName : 'products',
                onDelete : "CASCADE"
            })
        ) 
        await queryRunner.createForeignKey(
            "orderItems",
            new TableForeignKey({
                columnNames: ['orderId'],
                referencedColumnNames :['id'],
                referencedTableName : 'orders',
                onDelete : "CASCADE"
            })
        ) 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders")
        await queryRunner.dropTable("orderItems")
    }

}

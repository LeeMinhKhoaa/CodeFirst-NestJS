import { Column, MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CategoryAndProductCategory1724319134058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "categories",
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
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'userId',
                        type: 'int',
                    },
                ]
            })
        )
        await queryRunner.createTable(
            new Table({
              name: 'users',
              columns: [
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
                  name: 'email',
                  type: 'varchar',
                },
                // {
                //   name: 'role',
                //   type: 'tinyint',
                //   default: 0,
                // },
                {
                  name: 'role',
                  type: 'enum',
                  enum: ['ADMIN', 'BUYER'],
                  default: `'BUYER'`,
                },
                {
                  name: 'password',
                  type: 'varchar',
                },
                {
                  name: 'name',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'favoriteTheme',
                  type: 'varchar',
                  isNullable: true,
                },
              ],
            }),
          );
          
        await queryRunner.createForeignKey(
            "categories",
            new TableForeignKey({
                    columnNames:['userId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                    onDelete: 'CASCADE',
                })
        );  

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
        await queryRunner.dropTable('categories');
    }

}

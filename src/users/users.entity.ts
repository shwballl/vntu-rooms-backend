import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Users' })
export class User extends Model {
  @Column
  declare username: string;

  @Column
  declare password: string;
}

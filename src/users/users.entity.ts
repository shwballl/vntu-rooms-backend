import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Users' })
export class User extends Model {
  @Column
  declare username: string;

  @Column
  declare password: string;

  @Column(DataType.ARRAY(DataType.STRING))
  declare bookings: string[];

  @Column
  declare name: string;

  @Column
  declare surname: string;
}

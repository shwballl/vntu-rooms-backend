import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Rooms',
  timestamps: true,
})
export class Room extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Номер аудиторії',
  })
  declare name: string;

  @Column({ type: DataType.DATE, allowNull: true })
  declare isBookedOn: Date | null;

  @Column({ type: DataType.DATE, allowNull: true })
  declare isBookedUntil: Date | null;
}

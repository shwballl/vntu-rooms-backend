import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Room } from './rooms.entity';
import { InjectModel } from '@nestjs/sequelize/dist/common/sequelize.decorators';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room)
    private roomModel: typeof Room,
  ) {}

  async getRooms(): Promise<Room[]> {
    return this.roomModel.findAll();
  }

  async getRoomSchedule(name: string) {
    const room = await this.roomModel.findOne({
      where: { name },
      attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
    });

    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    return room.get({ plain: true });
  }

  async getRoomByName(name: string): Promise<Room> {
    const room = await this.roomModel.findOne({ where: { name } });
    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }
    return room;
  }
}

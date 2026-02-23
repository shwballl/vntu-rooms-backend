import { Injectable } from '@nestjs/common';
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

  async getRoomSchedule(id: string, schedule: string): Promise<Room | null> {
    return this.roomModel.findOne({ where: { id } });
  }
}

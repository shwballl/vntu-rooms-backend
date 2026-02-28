import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { RoomsModule } from '../rooms/rooms.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.entity';
import { Room } from 'src/rooms/rooms.entity';
@Module({
  imports: [RoomsModule, SequelizeModule.forFeature([User, Room])],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}

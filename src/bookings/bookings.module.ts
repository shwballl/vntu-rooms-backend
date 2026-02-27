import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { RoomsModule } from '../rooms/rooms.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.entity';
@Module({
  imports: [RoomsModule, SequelizeModule.forFeature([User])],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}

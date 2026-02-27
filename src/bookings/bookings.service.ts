import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoomsService } from 'src/rooms/rooms.service';
import { User } from 'src/users/users.entity';

@Injectable()
export class BookingsService {
  constructor(
    private roomsService: RoomsService,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async createBooking(user: User, bookingData: any) {
    const room = await this.roomsService.getRoomByName(bookingData.room_name);

    if (!room) {
      throw new NotFoundException(`Room ${bookingData.room_name} not found`);
    }

    const currentBookings = user.bookings || [];
    if (currentBookings.includes(room.name)) {
      return `Room ${room.name} is already in your bookings`;
    }

    const updatedBookings = [...currentBookings, room.name];

    await this.userRepository.update(
      { bookings: updatedBookings },
      { where: { id: user.id } },
    );

    room.isBookedOn = bookingData.booking_start_time;
    room.isBookedUntil = bookingData.booking_end_time;
    await room.save();

    return `Booking created for room ${room.name}`;
  }

  async getBookings(user: User) {
    const freshUser = await this.userRepository.findByPk(user.id);

    if (!freshUser) {
      throw new NotFoundException('User not found');
    }

    return freshUser.bookings || [];
  }

  async deleteBooking(room_name: string, user: User) {
    const room = await this.roomsService.getRoomByName(room_name);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const currentBookings = user.bookings || [];
    const updatedBookings = currentBookings.filter(
      (bookingName) => bookingName !== room_name,
    );

    await this.userRepository.update(
      { bookings: updatedBookings },
      { where: { id: user.id } },
    );

    room.isBookedOn = null;
    room.isBookedUntil = null;
    await room.save();

    return `Booking for room ${room_name} deleted`;
  }
}

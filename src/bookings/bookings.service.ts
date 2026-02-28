import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from 'src/rooms/rooms.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Room) private roomRepository: typeof Room,
  ) {}

  async createBooking(user: User, bookingData: any) {
    // 1. Беремо свіжого юзера з бази
    const freshUser = await this.userRepository.findByPk(user.id);
    if (!freshUser) throw new NotFoundException('Користувача не знайдено');

    // 2. Шукаємо кімнату за іменем
    const room = await this.roomRepository.findOne({
      where: { name: bookingData.room_name },
    });
    if (!room)
      throw new NotFoundException(
        `Кімната ${bookingData.room_name} не знайдена`,
      );

    // 3. Перевіряємо, чи вона вже заброньована кимось іншим
    if (room.isBookedOn) {
      throw new BadRequestException('Ця кімната вже заброньована на цей час');
    }

    // 4. Оновлюємо масив бронювань юзера
    const currentBookings = freshUser.bookings || [];
    if (!currentBookings.includes(room.name)) {
      await freshUser.update({
        bookings: [...currentBookings, room.name],
      });
    }

    // 5. Оновлюємо статус самої кімнати (isBookedOn)
    await room.update({
      isBookedOn: bookingData.booking_start_time,
      isBookedUntil: bookingData.booking_end_time,
    });

    return { message: 'Бронювання успішне', room };
  }

  async getBookings(user: User) {
    const freshUser = await this.userRepository.findByPk(user.id);
    if (!freshUser || !freshUser.bookings || freshUser.bookings.length === 0)
      return [];

    // Повертаємо об'єкти кімнат, щоб на фронті були дати
    return await this.roomRepository.findAll({
      where: { name: freshUser.bookings },
    });
  }

  async deleteBooking(room_name: string, user: User) {
    const freshUser = await this.userRepository.findByPk(user.id);
    const room = await this.roomRepository.findOne({
      where: { name: room_name },
    });

    if (freshUser) {
      const updated = (freshUser.bookings || []).filter(
        (name) => name !== room_name,
      );
      await freshUser.update({ bookings: updated });
    }

    if (room) {
      await room.update({ isBookedOn: null, isBookedUntil: null });
    }

    return { message: 'Видалено' };
  }
}
